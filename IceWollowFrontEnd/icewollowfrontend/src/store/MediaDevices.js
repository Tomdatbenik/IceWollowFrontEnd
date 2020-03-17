export default {
  state: {
    devices: {
      microphone: false,
      camera: false,
      speakers: false,
      cameraInUse: false,
      microphoneInUse: false
    }
  },
  mutations: {
    SET_MICROPHONE(state, status) {
      console.log("microphone set");
      state.devices.microphone = status;
    },
    SET_CAMERA(state, status) {
      state.devices.camera = status;
    },
    SET_SPEAKER(state, status) {
      state.devices.speakers = status;
    },
    SET_CAMERA_IN_USE(state, status) {
      state.devices.cameraInUse = status;
    },
    SET_MICROPHONE_IN_USE(state, status) {
      state.devices.microphoneInUse = status;
    }
  },
  actions: {
    async loadData(context) {
      console.log("Test");
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        // Firefox 38+ seems having support of enumerateDevicesx
        navigator.enumerateDevices = function(callback) {
          navigator.mediaDevices.enumerateDevices().then(callback);
        };
      }

      var MediaDevices = [];
      var isHTTPs = location.protocol === "https:";
      var canEnumerate = false;

      if (
        typeof MediaStreamTrack !== "undefined" &&
        "getSources" in MediaStreamTrack
      ) {
        canEnumerate = true;
      } else if (
        navigator.mediaDevices &&
        !!navigator.mediaDevices.enumerateDevices
      ) {
        canEnumerate = true;
      }

      var hasMicrophone = false;
      var hasSpeakers = false;
      var hasWebcam = false;

      var isMicrophoneAlreadyCaptured = false;
      var isWebcamAlreadyCaptured = false;

      async function checkDeviceSupport(callback) {
        if (!canEnumerate) {
          return;
        }

        if (
          !navigator.enumerateDevices &&
          window.MediaStreamTrack &&
          window.MediaStreamTrack.getSources
        ) {
          navigator.enumerateDevices = window.MediaStreamTrack.getSources.bind(
            window.MediaStreamTrack
          );
        }

        if (!navigator.enumerateDevices && navigator.enumerateDevices) {
          navigator.enumerateDevices = navigator.enumerateDevices.bind(
            navigator
          );
        }

        if (!navigator.enumerateDevices) {
          if (callback) {
            callback();
          }
          return;
        }

        MediaDevices = [];
        navigator.enumerateDevices(function(devices) {
          devices.forEach(function(_device) {
            var device = {};
            for (var d in _device) {
              device[d] = _device[d];
            }

            if (device.kind === "audio") {
              device.kind = "audioinput";
            }

            if (device.kind === "video") {
              device.kind = "videoinput";
            }

            var skip;
            MediaDevices.forEach(function(d) {
              if (d.id === device.id && d.kind === device.kind) {
                skip = true;
              }
            });

            if (skip) {
              return;
            }

            if (!device.deviceId) {
              device.deviceId = device.id;
            }

            if (!device.id) {
              device.id = device.deviceId;
            }

            if (!device.label) {
              device.label = "Please invoke getUserMedia once.";
              if (!isHTTPs) {
                device.label =
                  "HTTPs is required to get label of this " +
                  device.kind +
                  " device.";
              }
            } else {
              if (device.kind === "videoinput" && !isWebcamAlreadyCaptured) {
                isWebcamAlreadyCaptured = true;
              }

              if (
                device.kind === "audioinput" &&
                !isMicrophoneAlreadyCaptured
              ) {
                isMicrophoneAlreadyCaptured = true;
              }
            }

            if (device.kind === "audioinput") {
              hasMicrophone = true;
            }

            if (device.kind === "audiooutput") {
              hasSpeakers = true;
            }

            if (device.kind === "videoinput") {
              hasWebcam = true;
            }

            // there is no 'videoouput' in the spec.

            MediaDevices.push(device);
          });

          if (callback) {
            callback();
          }
        });
      }

      // check for microphone/camera support!
      await checkDeviceSupport(function() {
        console.log("Setting device data");
        context.commit("SET_MICROPHONE", hasMicrophone);
        context.commit("SET_CAMERA", hasWebcam);
        context.commit("SET_SPEAKER", hasSpeakers);
        context.commit("SET_MICROPHONE_IN_USE", isMicrophoneAlreadyCaptured);
        context.commit("SET_CAMERA_IN_USE", isWebcamAlreadyCaptured);
      });
    }
  },
  getters: {
    microphone: state => {
      return state.devices.microphone;
    },
    speakers: state => {
      return state.devices.speakers;
    },
    camera: state => {
      return state.devices.camera;
    },
    microphoneInUse: state => {
      return state.devices.microphoneInUse;
    },
    cameraInUse: state => {
      return state.devices.cameraInUse;
    }
  },
  modules: {}
};
