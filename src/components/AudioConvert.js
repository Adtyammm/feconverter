import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import Swal from "sweetalert2";

function AudioConvert() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [format, setFormat] = useState("");
  const [uploadedFileDetails, setUploadedFileDetails] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [audioData, setAudioData] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadedFileDetails(getFileDetails(event.target.files[0]));
  };

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const getFileDetails = (file) => {
    if (file) {
      return {
        name: file.name,
        type: file.type,
        size: file.size,
      };
    }
    return null;
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) {
      return bytes + " bytes";
    } else if (bytes < 1048576) {
      return (bytes / 1024).toFixed(2) + " KB";
    } else {
      return (bytes / 1048576).toFixed(2) + " MB";
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("audio", selectedFile);

    setLoading(true);

    axios
      .post("https://beconverter.vercel.app/convert/upload", formData)
      .then((response) => {
        const { filename } = response.data;
        Swal.fire("Success", "Berhail Upload Audio!", "success");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Error", "Gagal Upload Auido.", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAudioData();
  }, []);

  const fetchAudioData = () => {
    setLoading(true);
    axios
      .get("https://beconverter.vercel.app/convert/getdual")
      .then((response) => {
        setAudioData(response.data);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Error", "Gagal mendapatkan data audio.", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <h1 className="text-center mt-5">Konversi Audio</h1>

      <Row className="justify-content-center mt-5">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Upload File</Card.Title>

              <Form>
                <Form.Group>
                  <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>
                {/* {uploadedFileUrl && (
                  <div className="mt-4">
                    <h3>Play Audio</h3>
                    <audio controls>
                      <source src={uploadedFileUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )} */}

                {uploadedFileDetails && (
                  <div className="mt-4">
                    <h3>Detail</h3>
                    <p>Nama : {uploadedFileDetails.name}</p>
                    <p>Ukuran File : {formatSize(uploadedFileDetails.size)}</p>
                  </div>
                )}
                <Button
                  variant="primary"
                  onClick={handleUpload}
                  style={{ marginTop: "10px" }}
                  className="custom-button"
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Uploading...
                    </>
                  ) : (
                    "Upload"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Daftar Audio</Card.Title>

              {loading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nama</th>
                      <th>Tipe</th>
                      <th>Ukuran</th>
                      <th>PLay</th>
                    </tr>
                  </thead>
                  <tbody>
                    {audioData.map((audio, index) => (
                      <tr key={audio.id}>
                        <td>{index + 1}</td>
                        <td>{audio.originalname}</td>
                        <td>{audio.mimetype}</td>
                        <td>{audio.size}</td>
                        <td>
                          {" "}
                          <audio controls>
                            <source
                              src={`data:audio/mpeg;base64,${audio.audioData}`}
                              type="audio/mpeg"
                            />
                            Your browser does not support the audio element.
                          </audio>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AudioConvert;
