import { toast } from "react-hot-toast";

export default async function audioSearch(blobFile) {
  const formData = new FormData();
  formData.append("audio", blobFile, "recording.mp3");

  try {
    const response = await fetch("http://localhost:5001/audioSearch", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    const metadata = data.metadata;
    if (metadata) {
      let singersName = "";
      const music = metadata.music[0];
      const trackName = music.title;
      console.log(music);
      music.artists.forEach((artist) => (singersName += `${artist.name} `));
      toast.success("Song found 🎉 please wait...");
      return { artists: singersName, trackName };
    } else {
      toast.error("No song found 😓");
      return false;
    }
  } catch (error) {
    throw error;
  }
}
