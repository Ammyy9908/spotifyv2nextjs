import audioSearch from "./audioSearch";

async function RecordAudio(setSearchData, setRequestDone) {
  let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.start();

  const audioChunks = [];
  mediaRecorder.addEventListener("dataavailable", (event) => {
    audioChunks.push(event.data);
  });

  mediaRecorder.addEventListener("stop", async () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/mpeg-3" });

    const d = await audioSearch(audioBlob);
    if (d) {
      setSearchData(d);
      setRequestDone(false);
    } else {
      setSearchData(false);
      setRequestDone(false);
    }
  });

  setTimeout(() => {
    mediaRecorder.stop();
  }, 3000);
}

export default RecordAudio;
