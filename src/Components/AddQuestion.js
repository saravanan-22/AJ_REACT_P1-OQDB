import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { db } from "./Config/FirebaseConfig";
import { setDoc } from "firebase/firestore";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const apiUrl = "https://opentdb.com/api_category.php";


const currentDate = new Date();

      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      const loginDateWithDay = currentDate.toLocaleString("en-US", options);


const initialFormState = {
  SelectedCategory: "",
  SelectedType: "Multiple Choice",
  SelectedDifficulty: "",
  Question: "",
  CorrectAnswer: "",
  IncorrectAnswer1: "",
  IncorrectAnswer2: "",
  IncorrectAnswer3: "",
  Reference: "",
  Date: loginDateWithDay,
};

const AddQuestion = (props) => {
  const [userName, setUserName] = useState("");
  const [categories, setCategories] = useState([]);
  const [formState, setFormState] = useState(initialFormState);
  const [idValue, setIdValue] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userNameFromLocalStorage = localStorage.getItem("username");
    if (userNameFromLocalStorage) {
      setUserName(userNameFromLocalStorage);
    }
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories))
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const questionId = searchParams.get("id");
    setIsEditMode(!!questionId);

    if (questionId) {
      setIdValue(questionId);
      const fetchData = async () => {
        try {
          const uid = localStorage.getItem("uid");
          const washingtonRef = doc(db, "users/" + uid);
          const washingtonSnap = await getDoc(washingtonRef);
          const existingUserInputs = washingtonSnap.data().userInputs || {};
          const selectedQuestion = existingUserInputs[questionId];

          if (selectedQuestion) {
            setFormState({
              SelectedCategory: selectedQuestion.SelectedCategory,
              SelectedType: selectedQuestion.SelectedType,
              SelectedDifficulty: selectedQuestion.SelectedDifficulty,
              Question: selectedQuestion.Question,
              CorrectAnswer: selectedQuestion.CorrectAnswer,
              IncorrectAnswer1: selectedQuestion.IncorrectAnswer1,
              IncorrectAnswer2: selectedQuestion.IncorrectAnswer2,
              IncorrectAnswer3: selectedQuestion.IncorrectAnswer3,
              Reference: selectedQuestion.Reference,
              Date : loginDateWithDay,
            });
          }
        } catch (error) {
          console.error("Error fetching question data:", error);
        }
      };

      fetchData();
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userInputs = {
      SelectedID: idValue,
      ...formState,
    };

    const uid = localStorage.getItem("uid");
    const washingtonRef = doc(db, "users/" + uid);

    try {
      const washingtonSnap = await getDoc(washingtonRef);
      const existingUserInputs = washingtonSnap.data().userInputs || {};

      if (idValue) {
        existingUserInputs[idValue] = userInputs;
      } else {
        const num = Math.ceil(Math.random() * 100000);
        const value = num.toString();
        setIdValue(value);
        userInputs.SelectedID = value; // Set the idValue in the userInputs object
        existingUserInputs[value] = userInputs;
      }

      await updateDoc(washingtonRef, {
        userInputs: existingUserInputs,
      });

      if (idValue) {
        alert("Question updated successfully");
        navigate("/EditUnverifiedQ");
      } else {
        alert("Thanks for adding a question");
        navigate("/UserProfile");
      }

      setFormState(initialFormState); // Reset the form fields after successful submission
      // window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleTypeChange = (event) => {
    setFormState({ ...formState, SelectedType: event.target.value });
  };

  const handleDifficultyChange = (event) => {
    setFormState({ ...formState, SelectedDifficulty: event.target.value });
  };

  return (
    <div style={{ backgroundColor: "black", height: "90vh" }}>
      <section className="pt-3">
        {userName ? (
          <div className="w-75 mx-auto">
            <h3 style={{ color: "white" }}>
              {isEditMode ? "Edit Question" : "Add New Question"}
            </h3>

            <Form
              className=""
              style={{
                border: "2px solid rgb(139, 216, 188)",
                padding: "13px",
                borderRadius: "10px",
              }}
              onSubmit={handleSubmit}
            >
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCategory">
                  <Form.Label style={{ color: "white" }}>Category</Form.Label>
                  <Form.Select
                    required
                    value={formState.SelectedCategory}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        SelectedCategory: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      choose....
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridType">
                  <Form.Label style={{ color: "white" }}>Type</Form.Label>
                  <Form.Select
                    required
                    defaultValue={formState.SelectedType}
                    onChange={handleTypeChange}
                  >
                    <option>Multiple Choice</option>
                    <option>True or False</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridDifficulty">
                  <Form.Label style={{ color: "white" }}>Difficulty</Form.Label>
                  <Form.Select
                    required
                    value={formState.SelectedDifficulty}
                    onChange={handleDifficultyChange}
                  >
                    <option value="" disabled>
                      choose....
                    </option>
                    {["Easy", "Hard", "Medium"].map((difficulty) => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridQuestion">
                  <Form.Label style={{ color: "white" }}>Question</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter Question"
                    value={formState.Question}
                    onChange={(e) =>
                      setFormState({ ...formState, Question: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>
              {formState.SelectedType === "Multiple Choice" && (
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCorrectAnswer">
                    <Form.Label style={{ color: "white" }}>
                      Correct Answer
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter Correct Answer"
                      value={formState.CorrectAnswer}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          CorrectAnswer: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridIncorrectAnswer#1">
                    <Form.Label style={{ color: "white" }}>
                      Incorrect Answer #1
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter Incorrect Answer #1"
                      value={formState.IncorrectAnswer1}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          IncorrectAnswer1: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridIncorrectAnswer#2">
                    <Form.Label style={{ color: "white" }}>
                      Incorrect Answer #2
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter Incorrect Answer #2"
                      value={formState.IncorrectAnswer2}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          IncorrectAnswer2: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridIncorrectAnswer#3">
                    <Form.Label style={{ color: "white" }}>
                      Incorrect Answer #3
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter Incorrect Answer #3"
                      value={formState.IncorrectAnswer3}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          IncorrectAnswer3: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Row>
              )}
              {formState.SelectedType === "True or False" && (
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCorrectAnswer">
                    <Form.Label style={{ color: "white" }}>
                      Correct Answer
                    </Form.Label>
                    <Form.Select
                      required
                      defaultValue="Choose..."
                      value={formState.CorrectAnswer}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          CorrectAnswer: e.target.value,
                        })
                      }
                    >
                      <option>Choose...</option>
                      <option>True</option>
                      <option>False</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
              )}
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridReference">
                  <Form.Label style={{ color: "white" }}>
                    Reference [Provide Links to Respected Source] [Videos must
                    have Timestamps]
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter Reference"
                    value={formState.Reference}
                    onChange={(e) =>
                      setFormState({ ...formState, Reference: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>

              <Button variant="primary" type="submit">
                {isEditMode ? "Update" : "Submit"}
              </Button>
            </Form>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "rgb(231, 76, 60)",
              height: "6vh",
              width: "50vw",
              margin: "0 auto",
              borderRadius: "0.3em",
            }}
          >
            <h5
              className="ms-2"
              style={{
                paddingTop: "0.5rem",
                fontSize: "17px",
                textAlign: "center",
              }}
            >
              <span style={{ color: "black" }}>Error!</span>{" "}
              <span style={{ color: "white" }}>
                You must be logged in to submit a{" "}
                <span
                  style={{
                    color: "rgb(122, 190, 165) ",
                    textDecoration: "underline",
                  }}
                >
                  open db question.
                </span>
              </span>
            </h5>
          </div>
        )}
      </section>
    </div>
  );
};

export default AddQuestion;
