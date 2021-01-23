import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Stylesheet } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      hasCameraPermission: null,
      isScanned: false,
      ScannedData: "",
      buttonState: "normal",
    };
  }

  getCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasCameraPermission: status === "granted",
    });
  };

  handleBarcodeScan = (res) => {
    console.log("Scan in Progress...");
    this.setState({
      isScanned: false,
      ScannedData: res.data,
      buttonState: "normal",
    });
  };

  render() {
    var permissionGranted = this.state.hasCameraPermission;
    var isScanned = this.state.isScanned;
    var buttonState = this.state.buttonState;

    if (buttonState === "clicked" && permissionGranted) {
      return (
        <View>
          <Text style={{ marginTop: 50, textAlign: "center" }}>
            SCAN IN PROGRESS...
          </Text>
          <BarCodeScanner
            style={{
              display: "flex",
              alignSelf: "center",
              justifyContent: "center",
              width: "90%",
              height: "90%",
              marginTop: -50,
            }}
            onBarCodeRead={isScanned ? undefined : this.handleBarcodeScan}
            onBarCodeScanned={isScanned ? undefined : this.handleBarcodeScan}
          ></BarCodeScanner>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={{ fontSize: 18, textAlign: "center", marginTop: 100 }}>
            Scan a Barcode/QR Code
          </Text>
          <Image
            source={require("./assets/barcodeScanner.png")}
            style={{
              alignSelf: "center",
              width: "40%",
              height: "40%",
              resizeMode: "contain",
              marginRight: 20,
              marginTop: 30,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.getCameraPermission();
              this.setState({ buttonState: "clicked" });
            }}
            style={{
              backgroundColor: "#1e1e1e",
              borderRadius: 6,
              marginTop: 50,
              width: "40%",
              alignSelf: "center",
            }}
          >
            <Text style={{ textAlign: "center", color: "white" }}>SCAN</Text>
          </TouchableOpacity>
          <Text style={{ textAlign: "center", marginTop: 70 }}>
            {permissionGranted ? this.state.ScannedData : "No Data to show."}
          </Text>
        </View>
      );
    }
  }
}
