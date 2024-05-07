import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import Swal from "sweetalert2";

function DualAudio() {
  return (
    <Container>
      <div className=" mt-5">
        <h1 className="judul text-center mb-5 mt-5">Upload</h1>
        <TestAudio />
        <h1 className="judul text-center mb-5 mt-5">Tabel</h1>
        <DataTabel />
        <h1 className="judul text-center mb-5 mt-5">Merge</h1>
        <Merged />
      </div>
    </Container>
  );
}

export default DualAudio;

export function TestAudio() {
  const [audioFile1, setAudioFile1] = useState(null);
  const [audioFile2, setAudioFile2] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange1 = (event) => {
    setAudioFile1(event.target.files[0]);
    Swal.fire("Success!", "Berhasil Upload File Pertama", "success");
  };

  const handleFileChange2 = (event) => {
    setAudioFile2(event.target.files[0]);
    Swal.fire("Success!", "Berhasil Upload File Kedua / Backsound", "success");
  };

  const handleUpload = async () => {
    if (!audioFile1 || !audioFile2) {
      console.error("Please select both audio files.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("audioFiles", audioFile1);
    formData.append("audioFiles", audioFile2);

    try {
      const uploadResponse = await axios.post(
        "https://beconverter.vercel.app/merge/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Uploaded:", uploadResponse.data);

      setUploadResponse(uploadResponse.data);

      setAudioFile1(null);
      setAudioFile2(null);

      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: "Upload",
        text: "Upload Audio Berhasil.",
      });
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);

      Swal.fire({
        icon: "error",
        title: "Upload",
        text: "Upload Audio Gagal.",
      });
    }
  };

  const handleMerge = async () => {
    try {
      if (!uploadResponse) {
        console.error("Please upload audio files first.");
        return;
      }

      setIsLoading(true);

      const mergeResponse = await axios.post(
        "https://beconverter.vercel.app/merge/merge",
        { id: uploadResponse._id }
      );
      console.log("Merged audio:", mergeResponse.data);

      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: "Merge",
        text: "Merge Audio Berhasil.",
      });
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Merge",
        text: "Merge Audio gagal.",
      });
    }
  };

  const handleMergeWithBacksound = async () => {
    try {
      if (!uploadResponse) {
        console.error("Please upload audio files first.");
        return;
      }

      setIsLoading(true);

      const mergeWithBacksoundResponse = await axios.post(
        "https://beconverter.vercel.app/merge/mergewithbacksound",
        { id: uploadResponse._id }
      );
      console.log(
        "Merged audio with back sound:",
        mergeWithBacksoundResponse.data
      );

      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: "Merge Backsound",
        text: "Merge Backsound Audio Berhasil.",
      });
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Merge Backsound",
        text: "Merge Backsound Audio gagal.",
      });
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Col>
        <Card>
          <Card.Body>
            <h2 className="mb-3">Upload Audio Files</h2>
            <div className="mb-3">
              <div className="mb-5">
                <h3>Audio File 1</h3>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange1}
                />
              </div>
              <div className="mb-5">
                <h3>Audio File 2</h3>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange2}
                />
              </div>
              <Button className="mr-3" onClick={handleUpload}>
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Uploading...
                  </>
                ) : (
                  "Upload"
                )}
              </Button>
              <Button className="custom-button mr-3" onClick={handleMerge}>
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Merging...
                  </>
                ) : (
                  "Merge"
                )}
              </Button>
              <Button
                className="custom-button mr-3"
                onClick={handleMergeWithBacksound}
              >
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Merging...
                  </>
                ) : (
                  "Merge with Backsound"
                )}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export function DataTabel() {
  const [audioData, setAudioData] = useState([]);

  useEffect(() => {
    const fetchAudioData = async () => {
      try {
        const response = await axios.get(
          "https://beconverter.vercel.app/merge/getdual"
        );
        setAudioData(response.data);
      } catch (error) {
        console.error("Error fetching audio data:", error);
      }
    };

    fetchAudioData();
  }, []);

  return (
    <Row className="justify-content-md-center">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Audio 1</th>
            <th>Audio 2</th>
            <th>Merged</th>
            <th>Merged Backsound</th>
          </tr>
        </thead>
        <tbody>
          {audioData.map((audio, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <audio controls>
                  <source
                    src={`data:audio/mpeg;base64,${audio.audio1.audioData}`}
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
              </td>
              <td>
                <audio controls>
                  <source
                    src={`data:audio/mpeg;base64,${audio.audio2.audioData}`}
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
              </td>
              <td>
                <div key={index}>
                  <audio controls>
                    <source
                      src={`data:audio/mpeg;base64,${
                        audio.mergedData.length > 0
                          ? audio.mergedData[0].audioData
                          : ""
                      }`}
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </td>
              <td>
                <div key={index}>
                  <audio controls>
                    <source
                      src={`data:audio/mpeg;base64,${
                        audio.mergedDataBacksound.length > 0
                          ? audio.mergedDataBacksound[0].audioData
                          : ""
                      }`}
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Row>
  );
}

export function Merged() {
  const [audioData, setAudioData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAudioData = async () => {
      try {
        const response = await axios.get(
          "https://beconverter.vercel.app/merge/getdual"
        );
        setAudioData(response.data);
      } catch (error) {
        console.error("Error fetching audio data:", error);
      }
    };

    fetchAudioData();
  }, []);

  const handleMerge = async (id) => {
    try {
      setIsLoading(true);

      await axios.post(`https://beconverter.vercel.app/merge/merge`, { id });
      console.log(`Merge audio with ID ${id} request sent`);
      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: "Merge",
        text: "Merge Audio Berhasil.",
      });
    } catch (error) {
      console.error(`Error merging audio with ID ${id}:`, error);
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Merge",
        text: "Merge Audio gagal.",
      });
    }
  };

  const handleMergeWithBacksound = async (id) => {
    try {
      setIsLoading(true);
      await axios.post(
        `https://beconverter.vercel.app/merge/mergewithbacksound`,
        {
          id,
        }
      );
      console.log(`Merge audio with backsound with ID ${id} request sent`);
      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: "Merge Backsound",
        text: "Merge Backsound Audio Berhasil.",
      });
    } catch (error) {
      console.error(`Error merging audio with backsound with ID ${id}:`, error);
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Merge Backsound",
        text: "Merge Backsound Audio gagal.",
      });
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Audio</th>
            <th>Action</th>
            <th>Merge</th>
            <th>Merge Backsound</th>
          </tr>
        </thead>
        <tbody>
          {audioData.map((audio, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <audio controls>
                  <source
                    src={`data:audio/mpeg;base64,${audio.audio1.audioData}`}
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
                <audio controls>
                  <source
                    src={`data:audio/mpeg;base64,${audio.audio2.audioData}`}
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
              </td>
              <td>
                <div>
                  <Button
                    variant="primary"
                    className="custom-button"
                    onClick={() => handleMerge(audio.id)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner animation="border" size="sm" /> Merging...
                      </>
                    ) : (
                      "Gabungkan Audio"
                    )}
                  </Button>{" "}
                  <Button
                    variant="primary"
                    className="mt-3"
                    onClick={() => handleMergeWithBacksound(audio.id)}
                    style={{ fontWeight: "bold" }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner animation="border" size="sm" /> Backsound...
                      </>
                    ) : (
                      "Tambah Backsound"
                    )}
                  </Button>
                </div>
              </td>
              <td>
                <div key={index}>
                  <audio controls>
                    <source
                      src={`data:audio/mpeg;base64,${
                        audio.mergedData.length > 0
                          ? audio.mergedData[0].audioData
                          : ""
                      }`}
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </td>
              <td>
                <div key={index}>
                  <audio controls>
                    <source
                      src={`data:audio/mpeg;base64,${
                        audio.mergedDataBacksound.length > 0
                          ? audio.mergedDataBacksound[0].audioData
                          : ""
                      }`}
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Row>
  );
}
