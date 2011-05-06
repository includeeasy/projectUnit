/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.flowas.ec2service;

import com.amazonaws.ec2.doc._2010_11_15.DescribeVolumesSetItemResponseType;
import com.amazonaws.ec2.doc._2010_11_15.DescribeVolumesSetResponseType;
import javax.jws.WebService;

/**
 *
 * @author Administrator
 */
@WebService(serviceName = "AmazonEC2", portName = "AmazonEC2Port", endpointInterface = "com.amazonaws.ec2.doc._2010_11_15.AmazonEC2PortType", targetNamespace = "http://ec2.amazonaws.com/doc/2010-11-15/", wsdlLocation = "wsdl/s3.amazonaws.com/ec2-downloads/2010-11-15.ec2.wsdl")
public class Ec2WebService {

    public boolean activateLicense(java.lang.String licenseId, int capacity, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void allocateAddress(javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<java.lang.String> publicIp) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean associateAddress(java.lang.String publicIp, java.lang.String instanceId, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean associateDhcpOptions(java.lang.String dhcpOptionsId, java.lang.String vpcId, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void attachVolume(javax.xml.ws.Holder<java.lang.String> volumeId, javax.xml.ws.Holder<java.lang.String> instanceId, javax.xml.ws.Holder<java.lang.String> device, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<java.lang.String> status, javax.xml.ws.Holder<javax.xml.datatype.XMLGregorianCalendar> attachTime) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void attachVpnGateway(java.lang.String vpnGatewayId, java.lang.String vpcId, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.AttachmentType> attachment) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean authorizeSecurityGroupIngress(java.lang.String userId, java.lang.String groupName, com.amazonaws.ec2.doc._2010_11_15.IpPermissionSetType ipPermissions, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void bundleInstance(java.lang.String instanceId, com.amazonaws.ec2.doc._2010_11_15.BundleInstanceTaskStorageType storage, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.BundleInstanceTaskType> bundleInstanceTask) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void cancelBundleTask(java.lang.String bundleId, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.BundleInstanceTaskType> bundleInstanceTask) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean cancelConversionTask(java.lang.String conversionTaskId, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void cancelSpotInstanceRequests(com.amazonaws.ec2.doc._2010_11_15.SpotInstanceRequestIdSetType spotInstanceRequestIdSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.CancelSpotInstanceRequestsResponseSetType> spotInstanceRequestSet) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean confirmProductInstance(java.lang.String productCode, java.lang.String instanceId, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<java.lang.String> ownerId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void createCustomerGateway(java.lang.String type, java.lang.String ipAddress, int bgpAsn, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.CustomerGatewayType> customerGateway) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void createDhcpOptions(com.amazonaws.ec2.doc._2010_11_15.DhcpConfigurationItemSetType dhcpConfigurationSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.DhcpOptionsType> dhcpOptions) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void createImage(java.lang.String instanceId, java.lang.String name, java.lang.String description, java.lang.Boolean noReboot, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<java.lang.String> imageId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void createKeyPair(javax.xml.ws.Holder<java.lang.String> keyName, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<java.lang.String> keyFingerprint, javax.xml.ws.Holder<java.lang.String> keyMaterial) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean createPlacementGroup(java.lang.String groupName, java.lang.String strategy, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean createSecurityGroup(java.lang.String groupName, java.lang.String groupDescription, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void createSnapshot(javax.xml.ws.Holder<java.lang.String> volumeId, javax.xml.ws.Holder<java.lang.String> description, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<java.lang.String> snapshotId, javax.xml.ws.Holder<java.lang.String> status, javax.xml.ws.Holder<javax.xml.datatype.XMLGregorianCalendar> startTime, javax.xml.ws.Holder<java.lang.String> progress, javax.xml.ws.Holder<java.lang.String> ownerId, javax.xml.ws.Holder<java.lang.String> volumeSize) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void createSpotDatafeedSubscription(java.lang.String bucket, java.lang.String prefix, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.SpotDatafeedSubscriptionType> spotDatafeedSubscription) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void createSubnet(java.lang.String vpcId, java.lang.String cidrBlock, java.lang.String availabilityZone, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.SubnetType> subnet) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean createTags(com.amazonaws.ec2.doc._2010_11_15.ResourceIdSetType resourcesSet, com.amazonaws.ec2.doc._2010_11_15.ResourceTagSetType tagSet, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void createVolume(javax.xml.ws.Holder<java.lang.String> size, javax.xml.ws.Holder<java.lang.String> snapshotId, javax.xml.ws.Holder<java.lang.String> availabilityZone, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<java.lang.String> volumeId, javax.xml.ws.Holder<java.lang.String> status, javax.xml.ws.Holder<javax.xml.datatype.XMLGregorianCalendar> createTime) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void createVpc(java.lang.String cidrBlock, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.VpcType> vpc) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void createVpnConnection(java.lang.String type, java.lang.String customerGatewayId, java.lang.String vpnGatewayId, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.VpnConnectionType> vpnConnection) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void createVpnGateway(java.lang.String type, java.lang.String availabilityZone, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.VpnGatewayType> vpnGateway) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean deactivateLicense(java.lang.String licenseId, int capacity, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean deleteCustomerGateway(java.lang.String customerGatewayId, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean deleteDhcpOptions(java.lang.String dhcpOptionsId, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean deleteKeyPair(java.lang.String keyName, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean deletePlacementGroup(java.lang.String groupName, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean deleteSecurityGroup(java.lang.String groupName, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean deleteSnapshot(java.lang.String snapshotId, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean deleteSpotDatafeedSubscription(javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean deleteSubnet(java.lang.String subnetId, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean deleteTags(com.amazonaws.ec2.doc._2010_11_15.ResourceIdSetType resourcesSet, com.amazonaws.ec2.doc._2010_11_15.DeleteTagsSetType tagSet, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean deleteVolume(java.lang.String volumeId, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean deleteVpc(java.lang.String vpcId, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean deleteVpnConnection(java.lang.String vpnConnectionId, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean deleteVpnGateway(java.lang.String vpnGatewayId, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean deregisterImage(java.lang.String imageId, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeAddresses(com.amazonaws.ec2.doc._2010_11_15.DescribeAddressesInfoType publicIpsSet, com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.DescribeAddressesResponseInfoType> addressesSet) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeAvailabilityZones(com.amazonaws.ec2.doc._2010_11_15.DescribeAvailabilityZonesSetType availabilityZoneSet, com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.AvailabilityZoneSetType> availabilityZoneInfo) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeBundleTasks(com.amazonaws.ec2.doc._2010_11_15.DescribeBundleTasksInfoType bundlesSet, com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.BundleInstanceTasksSetType> bundleInstanceTasksSet) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public com.amazonaws.ec2.doc._2010_11_15.ConversionTaskSetType describeConversionTasks(com.amazonaws.ec2.doc._2010_11_15.ConversionTaskIdSetType conversionTaskIdSet) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeCustomerGateways(com.amazonaws.ec2.doc._2010_11_15.CustomerGatewayIdSetType customerGatewaySet, com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.CustomerGatewaySetType> customerGatewaySet0) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeDhcpOptions(com.amazonaws.ec2.doc._2010_11_15.DhcpOptionsIdSetType dhcpOptionsSet, com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.DhcpOptionsSetType> dhcpOptionsSet0) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeImageAttribute(javax.xml.ws.Holder<java.lang.String> imageId, com.amazonaws.ec2.doc._2010_11_15.EmptyElementType launchPermission, com.amazonaws.ec2.doc._2010_11_15.EmptyElementType productCodes, com.amazonaws.ec2.doc._2010_11_15.EmptyElementType kernel, com.amazonaws.ec2.doc._2010_11_15.EmptyElementType ramdisk, com.amazonaws.ec2.doc._2010_11_15.EmptyElementType blockDeviceMapping, com.amazonaws.ec2.doc._2010_11_15.EmptyElementType description, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.LaunchPermissionListType> launchPermission0, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.ProductCodeListType> productCodes0, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.NullableAttributeValueType> kernel0, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.NullableAttributeValueType> ramdisk0, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.NullableAttributeValueType> description0, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.BlockDeviceMappingType> blockDeviceMapping0) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeImages(com.amazonaws.ec2.doc._2010_11_15.DescribeImagesExecutableBySetType executableBySet, com.amazonaws.ec2.doc._2010_11_15.DescribeImagesInfoType imagesSet, com.amazonaws.ec2.doc._2010_11_15.DescribeImagesOwnersType ownersSet, com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.DescribeImagesResponseInfoType> imagesSet0) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeInstanceAttribute(javax.xml.ws.Holder<java.lang.String> instanceId, com.amazonaws.ec2.doc._2010_11_15.EmptyElementType instanceType, com.amazonaws.ec2.doc._2010_11_15.EmptyElementType kernel, com.amazonaws.ec2.doc._2010_11_15.EmptyElementType ramdisk, com.amazonaws.ec2.doc._2010_11_15.EmptyElementType userData, com.amazonaws.ec2.doc._2010_11_15.EmptyElementType disableApiTermination, com.amazonaws.ec2.doc._2010_11_15.EmptyElementType instanceInitiatedShutdownBehavior, com.amazonaws.ec2.doc._2010_11_15.EmptyElementType rootDeviceName, com.amazonaws.ec2.doc._2010_11_15.EmptyElementType blockDeviceMapping, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.NullableAttributeValueType> instanceType0, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.NullableAttributeValueType> kernel0, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.NullableAttributeValueType> ramdisk0, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.NullableAttributeValueType> userData0, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.NullableAttributeBooleanValueType> disableApiTermination0, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.NullableAttributeValueType> instanceInitiatedShutdownBehavior0, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.NullableAttributeValueType> rootDeviceName0, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.InstanceBlockDeviceMappingResponseType> blockDeviceMapping0) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeInstances(com.amazonaws.ec2.doc._2010_11_15.DescribeInstancesInfoType instancesSet, com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.ReservationSetType> reservationSet) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeKeyPairs(com.amazonaws.ec2.doc._2010_11_15.DescribeKeyPairsInfoType keySet, com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.DescribeKeyPairsResponseInfoType> keySet0) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeLicenses(com.amazonaws.ec2.doc._2010_11_15.LicenseIdSetType licenseIdSet, com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.LicenseSetType> licenseSet) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describePlacementGroups(com.amazonaws.ec2.doc._2010_11_15.DescribePlacementGroupsInfoType placementGroupSet, com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.PlacementGroupSetType> placementGroupSet0) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeRegions(com.amazonaws.ec2.doc._2010_11_15.DescribeRegionsSetType regionSet, com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.RegionSetType> regionInfo) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeReservedInstances(com.amazonaws.ec2.doc._2010_11_15.DescribeReservedInstancesSetType reservedInstancesSet, com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.DescribeReservedInstancesResponseSetType> reservedInstancesSet0) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeReservedInstancesOfferings(com.amazonaws.ec2.doc._2010_11_15.DescribeReservedInstancesOfferingsSetType reservedInstancesOfferingsSet, java.lang.String instanceType, java.lang.String availabilityZone, java.lang.String productDescription, com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.DescribeReservedInstancesOfferingsResponseSetType> reservedInstancesOfferingsSet0) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeSecurityGroups(com.amazonaws.ec2.doc._2010_11_15.DescribeSecurityGroupsSetType securityGroupSet, com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.SecurityGroupSetType> securityGroupInfo) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeSnapshotAttribute(javax.xml.ws.Holder<java.lang.String> snapshotId, com.amazonaws.ec2.doc._2010_11_15.EmptyElementType createVolumePermission, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.CreateVolumePermissionListType> createVolumePermission0) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeSnapshots(com.amazonaws.ec2.doc._2010_11_15.DescribeSnapshotsSetType snapshotSet, com.amazonaws.ec2.doc._2010_11_15.DescribeSnapshotsOwnersType ownersSet, com.amazonaws.ec2.doc._2010_11_15.DescribeSnapshotsRestorableBySetType restorableBySet, com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.DescribeSnapshotsSetResponseType> snapshotSet0) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeSpotDatafeedSubscription(javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.SpotDatafeedSubscriptionType> spotDatafeedSubscription) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeSpotInstanceRequests(com.amazonaws.ec2.doc._2010_11_15.SpotInstanceRequestIdSetType spotInstanceRequestIdSet, com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.SpotInstanceRequestSetType> spotInstanceRequestSet) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeSpotPriceHistory(javax.xml.datatype.XMLGregorianCalendar startTime, javax.xml.datatype.XMLGregorianCalendar endTime, com.amazonaws.ec2.doc._2010_11_15.InstanceTypeSetType instanceTypeSet, com.amazonaws.ec2.doc._2010_11_15.ProductDescriptionSetType productDescriptionSet, com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.SpotPriceHistorySetType> spotPriceHistorySet) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeSubnets(com.amazonaws.ec2.doc._2010_11_15.SubnetIdSetType subnetSet, com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.SubnetSetType> subnetSet0) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeTags(com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.TagSetType> tagSet) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeVolumes(com.amazonaws.ec2.doc._2010_11_15.DescribeVolumesSetType volumeSet, com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.DescribeVolumesSetResponseType> volumeSet0) {
    	//TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");           
    }

    public void describeVpcs(com.amazonaws.ec2.doc._2010_11_15.VpcIdSetType vpcSet, com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.VpcSetType> vpcSet0) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeVpnConnections(com.amazonaws.ec2.doc._2010_11_15.VpnConnectionIdSetType vpnConnectionSet, com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.VpnConnectionSetType> vpnConnectionSet0) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void describeVpnGateways(com.amazonaws.ec2.doc._2010_11_15.VpnGatewayIdSetType vpnGatewaySet, com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.VpnGatewaySetType> vpnGatewaySet0) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void detachVolume(javax.xml.ws.Holder<java.lang.String> volumeId, javax.xml.ws.Holder<java.lang.String> instanceId, javax.xml.ws.Holder<java.lang.String> device, java.lang.Boolean force, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<java.lang.String> status, javax.xml.ws.Holder<javax.xml.datatype.XMLGregorianCalendar> attachTime) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean detachVpnGateway(java.lang.String vpnGatewayId, java.lang.String vpcId, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean disassociateAddress(java.lang.String publicIp, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void getConsoleOutput(javax.xml.ws.Holder<java.lang.String> instanceId, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<javax.xml.datatype.XMLGregorianCalendar> timestamp, javax.xml.ws.Holder<java.lang.String> output) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void getPasswordData(javax.xml.ws.Holder<java.lang.String> instanceId, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<javax.xml.datatype.XMLGregorianCalendar> timestamp, javax.xml.ws.Holder<java.lang.String> passwordData) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public com.amazonaws.ec2.doc._2010_11_15.ConversionTaskType importInstance(java.lang.String description, com.amazonaws.ec2.doc._2010_11_15.ImportInstanceLaunchSpecificationType launchSpecification, com.amazonaws.ec2.doc._2010_11_15.DiskImageSetType diskImageSet, java.lang.String platform) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void importKeyPair(javax.xml.ws.Holder<java.lang.String> keyName, java.lang.String publicKeyMaterial, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<java.lang.String> keyFingerprint) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public com.amazonaws.ec2.doc._2010_11_15.ConversionTaskType importVolume(java.lang.String availabilityZone, com.amazonaws.ec2.doc._2010_11_15.DiskImageDetailType image, java.lang.String description, com.amazonaws.ec2.doc._2010_11_15.DiskImageVolumeType volume) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean modifyImageAttribute(java.lang.String imageId, com.amazonaws.ec2.doc._2010_11_15.LaunchPermissionOperationType launchPermission, com.amazonaws.ec2.doc._2010_11_15.ProductCodeListType productCodes, com.amazonaws.ec2.doc._2010_11_15.AttributeValueType description, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean modifyInstanceAttribute(java.lang.String instanceId, com.amazonaws.ec2.doc._2010_11_15.AttributeValueType instanceType, com.amazonaws.ec2.doc._2010_11_15.AttributeValueType kernel, com.amazonaws.ec2.doc._2010_11_15.AttributeValueType ramdisk, com.amazonaws.ec2.doc._2010_11_15.AttributeValueType userData, com.amazonaws.ec2.doc._2010_11_15.AttributeBooleanValueType disableApiTermination, com.amazonaws.ec2.doc._2010_11_15.AttributeValueType instanceInitiatedShutdownBehavior, com.amazonaws.ec2.doc._2010_11_15.InstanceBlockDeviceMappingType blockDeviceMapping, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean modifySnapshotAttribute(java.lang.String snapshotId, com.amazonaws.ec2.doc._2010_11_15.CreateVolumePermissionOperationType createVolumePermission, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void monitorInstances(com.amazonaws.ec2.doc._2010_11_15.MonitorInstancesSetType instancesSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.MonitorInstancesResponseSetType> instancesSet0) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void purchaseReservedInstancesOffering(java.lang.String reservedInstancesOfferingId, int instanceCount, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<java.lang.String> reservedInstancesId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean rebootInstances(com.amazonaws.ec2.doc._2010_11_15.RebootInstancesInfoType instancesSet, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void registerImage(java.lang.String imageLocation, java.lang.String name, java.lang.String description, java.lang.String architecture, java.lang.String kernelId, java.lang.String ramdiskId, java.lang.String rootDeviceName, com.amazonaws.ec2.doc._2010_11_15.BlockDeviceMappingType blockDeviceMapping, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<java.lang.String> imageId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean releaseAddress(java.lang.String publicIp, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void requestSpotInstances(java.lang.String spotPrice, java.math.BigInteger instanceCount, java.lang.String type, javax.xml.datatype.XMLGregorianCalendar validFrom, javax.xml.datatype.XMLGregorianCalendar validUntil, java.lang.String launchGroup, java.lang.String availabilityZoneGroup, com.amazonaws.ec2.doc._2010_11_15.LaunchSpecificationRequestType launchSpecification, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.SpotInstanceRequestSetType> spotInstanceRequestSet) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean resetImageAttribute(java.lang.String imageId, com.amazonaws.ec2.doc._2010_11_15.EmptyElementType launchPermission, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean resetInstanceAttribute(java.lang.String instanceId, com.amazonaws.ec2.doc._2010_11_15.EmptyElementType kernel, com.amazonaws.ec2.doc._2010_11_15.EmptyElementType ramdisk, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean resetSnapshotAttribute(java.lang.String snapshotId, com.amazonaws.ec2.doc._2010_11_15.EmptyElementType createVolumePermission, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public boolean revokeSecurityGroupIngress(java.lang.String userId, java.lang.String groupName, com.amazonaws.ec2.doc._2010_11_15.IpPermissionSetType ipPermissions, javax.xml.ws.Holder<java.lang.String> requestId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void runInstances(java.lang.String imageId, int minCount, int maxCount, java.lang.String keyName, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.GroupSetType> groupSet, java.lang.String additionalInfo, com.amazonaws.ec2.doc._2010_11_15.UserDataType userData, java.lang.String addressingType, java.lang.String instanceType, com.amazonaws.ec2.doc._2010_11_15.PlacementRequestType placement, java.lang.String kernelId, java.lang.String ramdiskId, com.amazonaws.ec2.doc._2010_11_15.BlockDeviceMappingType blockDeviceMapping, com.amazonaws.ec2.doc._2010_11_15.MonitoringInstanceType monitoring, java.lang.String subnetId, java.lang.Boolean disableApiTermination, java.lang.String instanceInitiatedShutdownBehavior, com.amazonaws.ec2.doc._2010_11_15.InstanceLicenseRequestType license, java.lang.String privateIpAddress, java.lang.String clientToken, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<java.lang.String> reservationId, javax.xml.ws.Holder<java.lang.String> ownerId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.RunningInstancesSetType> instancesSet, javax.xml.ws.Holder<java.lang.String> requesterId) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void startInstances(com.amazonaws.ec2.doc._2010_11_15.InstanceIdSetType instancesSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.InstanceStateChangeSetType> instancesSet0) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void stopInstances(com.amazonaws.ec2.doc._2010_11_15.InstanceIdSetType instancesSet, java.lang.Boolean force, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.InstanceStateChangeSetType> instancesSet0) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void terminateInstances(com.amazonaws.ec2.doc._2010_11_15.InstanceIdSetType instancesSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.InstanceStateChangeSetType> instancesSet0) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }

    public void unmonitorInstances(com.amazonaws.ec2.doc._2010_11_15.MonitorInstancesSetType instancesSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.MonitorInstancesResponseSetType> instancesSet0) {
        //TODO implement this method
        throw new UnsupportedOperationException("Not implemented yet.");
    }
    
}
