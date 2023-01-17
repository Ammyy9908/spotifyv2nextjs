import React from "react";
import { MdClear } from "react-icons/md";

import PcIcon from "../Icons/PcIcon";
import DeviceSpeakerIcon from "../Icons/DeviceSpeakerIcon";
import getDevices from "../../utils/getDevices";
import { connect } from "react-redux";
import { setDevicePopup } from "../../redux/actions/_appActions";
import transferTrack from "../../utils/transferPlayback";
import getPlayer from "../../utils/getPlayer";
import MobileIcon from "../Icons/MobileIcon";

function DevicePopUp({ device_popup, setPopup }) {
  const [devices, setDevices] = React.useState(null);
  const [currentDevice, setCurrentDevice] = React.useState(null);
  React.useEffect(() => {
    async function getAllDevices() {
      try {
        const response = await getDevices();
        console.log(response);
        setDevices(response.devices.filter((device) => !device.is_active));
        setCurrentDevice(
          response.devices.filter((device) => device.is_active)[0]
        );
      } catch (e) {
        console.log(e);
      }
    }
    getAllDevices();
  }, [device_popup]);

  console.log(devices);

  const handleTransfer = async (id) => {
    await transferTrack(id);
    setPopup(false);
  };
  return (
    <div
      className={`text-white transition-all device_card absolute bg-gray-800 w-[350px] px-3 py-6 right-10  ${
        device_popup ? "bottom-[80px]" : "-bottom-[500px]"
      } flex flex-col gap-6 items-start rounded-md`}
    >
      <button
        className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center absolute -top-4 right-0"
        onClick={(e) => {
          e.preventDefault();
          setPopup(false);
        }}
      >
        <MdClear />
      </button>
      <div className="current-device-header">
        {currentDevice && (
          <div className="current-device-content">
            <div className="flex items-start gap-3">
              <span className="flex w-10 h-10  items-center justify-center">
                <img
                  src="https://open.spotifycdn.com/cdn/images/device-picker-equaliser-animation.946e7243.webp"
                  alt="equalizer"
                />
              </span>
              <div className="flex flex-col items-start">
                <h3 className="font-bold">Current device</h3>
                <div className="flex items-center gap-3">
                  <span>
                    <DeviceSpeakerIcon />
                  </span>
                  <p className="text-sm text-green-500 font-bold">
                    {currentDevice.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <p>select another device</p>
      <div className="devices flex flex-col items-start gap-3 w-full">
        {devices?.map((device, i) => {
          return (
            <div
              key={i}
              className="cursor-pointer device-list flex px-2 py-2 gap-4 hover:bg-gray-300/40 w-full rounded-md"
              onClick={() => {
                handleTransfer(device.id);
              }}
            >
              <div className="device-icon">
                {device.type === "Smartphone" ? <MobileIcon /> : <PcIcon />}
              </div>
              <p>{device.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  device_popup: state.appReducer.device_popup,
});

const mapDispatchToProps = (dispatch) => ({
  setPopup: (device_popup) => dispatch(setDevicePopup(device_popup)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DevicePopUp);
