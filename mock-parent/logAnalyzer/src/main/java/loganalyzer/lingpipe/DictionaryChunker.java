package loganalyzer.lingpipe;

import loganalyzer.TablePayload;
import java.io.IOException;
import com.aliasi.chunk.Chunk;
import com.aliasi.chunk.Chunking;
import com.aliasi.dict.DictionaryEntry;
import com.aliasi.dict.MapDictionary;
import com.aliasi.dict.ExactDictionaryChunker;

import com.aliasi.tokenizer.IndoEuropeanTokenizerFactory;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import loganalyzer.LogAnalyzer;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

public class DictionaryChunker {

    static final double CHUNK_SCORE = 1.0;
    static MapDictionary<String> dictionary = new MapDictionary<String>();
    static ExactDictionaryChunker chunker;

    public static List<TablePayload> extract(String text) throws ParserConfigurationException, SAXException, IOException {
        if (chunker == null) {
            init();
        }
        Chunking chunking = chunker.chunk(text);
		// System.out.println("\nChunker."
		// + " All matches=" + chunker.returnAllMatches()
		// + " Case sensitive=" + chunker.caseSensitive());
        List<Map<String, String>> results = new ArrayList<Map<String, String>>();
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        factory.setIgnoringComments(true);
        factory.setIgnoringElementContentWhitespace(true);
        Document doc = factory.newDocumentBuilder().parse(LogAnalyzer.class.getResourceAsStream("/rule.xml"));
        doc.normalizeDocument();
        NodeList defines = doc.getDocumentElement().getElementsByTagName("define");
        for (int i = 0; i < defines.getLength(); i++) {
            Element define = (Element) defines.item(i);
            NodeList groups = define.getChildNodes();
            for (int j = 0; j < groups.getLength(); j++) {
                if (groups.item(j) instanceof Element) {
                    Element group = (Element) groups.item(j);
                    if ("sequece".equals(group.getTagName())) {
                        sequece(group, chunking, text, null, results);
                    }
                }
            }
            //System.out.println(define.getAttribute("name"));            
        }
        List<TablePayload> rsl = new ArrayList<TablePayload>();
        NodeList displaies = doc.getDocumentElement().getElementsByTagName("display");
        for (Map<String, String> result : results) {
            for (int i = 0; i < displaies.getLength(); i++) {
                Element display = (Element) displaies.item(i);
                List<TablePayload> dis = TablePayload.parse(result, display);
                rsl.addAll(dis);
            }
        }
        return rsl;
    }

    private static void sequece(Element sequece, Chunking chunking, String text, Map<String, String> parent, List<Map<String, String>> results) {
        NodeList elements = sequece.getChildNodes();
        int i = 0;
        int sequeceStart = -1;
        Map<String, String> current = new HashMap<String, String>();
        if (parent != null) {
            current.putAll(parent);
        }
        boolean hasSubSequece = false;
        for (Chunk chunk : chunking.chunkSet()) {
            int start = chunk.start();
            if (sequeceStart == -1) {
                sequeceStart = start;
            }
            int end = chunk.end();
            String type = chunk.type();
            String phrase = text.substring(start, end);
            while (!(elements.item(i) instanceof Element) && i < elements.getLength()) {
                i++;
            }
            if (elements.item(i) instanceof Element) {
                Element element = (Element) elements.item(i);
                String tagName = element.getTagName();
                boolean matched = false;
                if ("type".equals(tagName) && element.getTextContent().trim().contains(type)) {
                    current.put(type + "_" + start, phrase);
                    matched = true;
                }
                if ("phrase".equals(tagName) && phrase.equals(element.getTextContent().trim())) {
                    current.put(type + "_" + start, phrase);
                    matched = true;
                }
                if ("sequece".equals(tagName)) {
                    sequece(element, chunking, text, current, results);
                    matched = true;
                    hasSubSequece = true;
                }
                if ("terminate".equals(tagName)) {
                    if (!hasSubSequece) {
                        results.add(current);
                    }
                    if (terminate(element, sequeceStart, end)) {
                        return;
                    } else {
                        current = new HashMap<String, String>();
                        if (parent != null) {
                            current.putAll(parent);
                        }
                        current.put(type + "_" + start, phrase);
                        matched = true;
                        i = 0;
                    }
                }
                if (matched) {
                    while (!(elements.item(i) instanceof Element) && i < elements.getLength()) {
                        i++;
                    }
                    i++;
                }
            }
        }
        if (!hasSubSequece) {
            results.add(current);
        }
    }

    private static boolean terminate(Element e, int start, int end) {
        if (e.getElementsByTagName("utilNext").getLength() > 0) {
            return true;
        } else if (e.getElementsByTagName("maxContextLenth").getLength() > 0) {
            String i = "";
            NodeList ns = e.getElementsByTagName("maxContextLenth");
            for (int j = 0; j < ns.getLength(); j++) {
                i += ns.item(j).getTextContent();
            }
            if (Integer.parseInt(i) > end - start) {
                return false;
            }
            return true;
        }
        return false;
    }

    private static void init() {
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(DictionaryChunker.class.getResourceAsStream("/dictionary.txt")));
            String line;
            while ((line = reader.readLine()) != null) {
                line = line.trim();
                if (line.contains(" ")) {
                    String[] pair = line.split(" ");
                    dictionary.addEntry(new DictionaryEntry<String>(pair[0].trim(), pair[1].trim(), CHUNK_SCORE));
                }
            }
        } catch (IOException ex) {
            Logger.getLogger(DictionaryChunker.class.getName()).log(Level.SEVERE, null, ex);
        }
        chunker = new ExactDictionaryChunker(dictionary,
                IndoEuropeanTokenizerFactory.INSTANCE,
                true, true);
    }
}
