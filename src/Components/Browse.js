import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Config/FirebaseConfig";
import { FaSistrix, FaArrowUp, FaArrowDown } from "react-icons/fa";

const apiUrl = "https://opentdb.com/api_category.php";

const Browse = () => {
  const [loginDate, setLoginDate] = useState("");
  const [userName, setUserName] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchError, setSearchError] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("SelectedID");
  const itemsPerPage = 5;
  const [filterOption, setFilterOption] = useState("Question");
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const date = localStorage.getItem("loginDate");
    const userName = localStorage.getItem("username");
    setLoginDate(date);
    setUserName(userName);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersCollectionRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollectionRef);
        const usersData = [];
        const userInputsData = [];

        usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          const { userInputs } = userData;
          const userId = doc.id;
          usersData.push({ id: userId, ...userData });
          if (userInputs) {
            for (const input of Object.values(userInputs)) {
              userInputsData.push(input);
            }
          }
        });

        setUserInput(userInputsData);
        setUserDetails(usersData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = userInput.filter((item) => {
      if (!item) return false;

      if (filterOption === "Question") {
        return (
          item.Question &&
          item.Question.toLowerCase().includes(searchValue.toLowerCase())
        );
      } else if (filterOption === "User") {
        return (
          item.SelectedID &&
          item.SelectedID.toLowerCase().includes(searchValue.toLowerCase())
        );
      } else if (filterOption === "Category") {
        return (
          item.SelectedCategory &&
          item.SelectedCategory.toLowerCase().includes(
            searchValue.toLowerCase()
          )
        );
      } else if (filterOption === "Type") {
        return (
          item.SelectedType &&
          item.SelectedType.toLowerCase().includes(searchValue.toLowerCase())
        );
      } else if (filterOption === "Difficulty") {
        return (
          item.SelectedDifficulty &&
          item.SelectedDifficulty.toLowerCase().includes(
            searchValue.toLowerCase()
          )
        );
      }

      return true;
    });

    setFilteredItems(filteredData);
  }, [userInput, filterOption, searchValue]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSearchError(false);
    const form = event.target;
    const searchValue = form.elements.search.value.trim();
    const filterOption = form.elements.filterOption.value;

    // Check if the filter option is "Question" and search value is not empty.
    if (filterOption === "Question" && searchValue === "") {
      setSearchError(true);
    } else {
      setSearchError(false);
      setSearchValue(searchValue);
      setFilterOption(filterOption);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedItems = currentItems.slice().sort((a, b) => {
    let fieldA = a[sortField];
    let fieldB = b[sortField];

    if (sortField === "SelectedID") {
      fieldA = parseInt(a[sortField]);
      fieldB = parseInt(b[sortField]);
    }

    if (sortOrder === "asc") {
      return fieldA < fieldB ? -1 : 1;
    } else {
      return fieldA > fieldB ? -1 : 1;
    }
  });

  return (
    <div style={{ backgroundColor: "black", minHeight: "90vh" }}>
      <Form
        className="d-flex mx-auto pt-3"
        style={{ width: "25em" }}
        onSubmit={handleFormSubmit}
      >
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          name="search"
        />
        <select
          name="filterOption"
          style={{
            borderRadius: "0.3rem",
            margin: "0 0.5em",
            padding: "0.5em",
          }}
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
        >
          <option value="Category">Category</option>
          <option value="Type">Type</option>
          <option value="Difficulty">Difficulty</option>
          <option value="Question">Question</option>
        </select>
      </Form>
      {searchError && filterOption === "Question" && (
        <div
          style={{
            color: "red",
            textAlign: "center",
            marginTop: "0.5rem",
            fontWeight: "bold",
          }}
        >
          Please select a category!
        </div>
      )}
      <div className="w-75 m-auto">
        <section style={{ overflowY: "auto", maxHeight: "80vh" }}>
          <h4 style={{ color: "white", marginTop: "1em" }}>Browse Questions</h4>
          {Array.isArray(sortedItems) && sortedItems.length === 0 ? (
            <div
              style={{
                backgroundColor: "rgb(231, 76, 60)",
                height: "6vh",
                width: "75vw",
                margin: "1em  0",
              }}
            >
              <h5
                className="ms-2 "
                style={{ paddingTop: "0.5rem", fontSize: "17px" }}
              >
                No questions found!
              </h5>
            </div>
          ) : (
            <Table
              striped
              bordered
              hover
              variant="dark"
              className="bg-dark mb-5"
            >
              <thead>
                <tr>
                  <th onClick={() => handleSort("SelectedID")}>
                    {" "}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <span className="me-2">User ID</span>
                      {sortField === "SelectedID" && sortOrder === "asc" && (
                        <FaArrowUp />
                      )}
                      {sortField === "SelectedID" && sortOrder === "desc" && (
                        <FaArrowDown />
                      )}
                    </div>
                  </th>
                  <th onClick={() => handleSort("SelectedCategory")}>
                    Category{" "}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {sortField === "SelectedCategory" &&
                        sortOrder === "asc" && <FaArrowUp />}
                      {sortField === "SelectedCategory" &&
                        sortOrder === "desc" && <FaArrowDown />}
                    </div>
                  </th>
                  <th onClick={() => handleSort("SelectedType")}>
                    Type{" "}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {sortField === "SelectedType" && sortOrder === "asc" && (
                        <FaArrowUp style={{ color: "green" }} />
                      )}
                      {sortField === "SelectedType" && sortOrder === "desc" && (
                        <FaArrowDown style={{ color: "red" }} />
                      )}
                    </div>
                  </th>
                  <th onClick={() => handleSort("SelectedDifficulty")}>
                    Difficulty{" "}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {sortField === "SelectedDifficulty" &&
                        sortOrder === "asc" && <FaArrowUp />}
                      {sortField === "SelectedDifficulty" &&
                        sortOrder === "desc" && <FaArrowDown />}
                    </div>
                  </th>
                  <th onClick={() => handleSort("Question")}>
                    Question{" "}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {sortField === "Question" && sortOrder === "asc" && (
                        <FaArrowUp />
                      )}
                      {sortField === "Question" && sortOrder === "desc" && (
                        <FaArrowDown />
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedItems.map((user) => (
                  <tr key={user.id}>
                    <td>{user.SelectedID}</td>
                    <td>{user.SelectedCategory}</td>
                    <td>{user.SelectedType}</td>
                    <td>{user.SelectedDifficulty}</td>
                    <td>{user.Question}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </section>
      </div>
      <div
        className="w-100 d-flex justify-content-center"
        style={{ position: "absolute", bottom: "1em", left: 0, right: 0 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "0.5em",
          }}
        >
          {Array.from({
            length: Math.ceil(filteredItems.length / itemsPerPage),
          }).map((item, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              style={{
                margin: "0.5em",
                padding: "0.3em 0.6em",
                backgroundColor: currentPage === index + 1 ? "gray" : "white",
                color: currentPage === index + 1 ? "white" : "black",
                border: "1px solid gray",
                borderRadius: "4px",
                cursor: "pointer",
                boxShadow: "0 2px 2px rgba(0, 0, 0, 0.3)",
                outline: "none",
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
