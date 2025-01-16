import React, { useState, useEffect, useRef } from "react";
import "./Doctor.css";
import {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../../services/apiService.ts";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import editIcon from "../../utils/Images/editIcon.svg";
import deleteIcon from "../../utils/Images/deleteIcon.svg";
import AddEditModal from "../../components/Modal/AddEditModal.tsx";

// interface for doctor info
interface IDoctor {
  id: number;
  name: string;
  specialization: string;
  location: string;
  email: string;
  image?: string;
}

const Doctor = () => {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [search, setSearch] = useState("");
  const debounceRef = useRef(null);
  const limit = 10;

  useEffect(() => {
    loadDoctors();
  }, [page, search]);

  // initial fetch all doctor data
  const loadDoctors = async () => {
    setLoading(true);
    try {
      const response = await getDoctors(page, limit, search);
      setDoctors(response.data);
      setTotalRecords(response.total);
    } catch (err) {
      setError("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  // handle search doctor
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  
    // Clear debounce if already running
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  
    if (value.trim() === "") {
      // If the search is cleared, immediately load ambulances without debounce
      setPage(1); // Reset to the first page
      loadDoctors();
    } else {
      // Debounce the search input for performance
      debounceRef.current = setTimeout(() => {
        setPage(1); // Reset to the first page
        loadDoctors();
      }, 500); // Delay of 500ms
    }
  };

  // handle add doctor
  const handleAdd = () => {
    setIsEdit(false);
    setPopupData({});
    setIsPopupOpen(true);
  };

  // handle edit doctor
  const handleEdit = (doctor: IDoctor) => {
    setIsEdit(true);
    setPopupData(doctor);
    setIsPopupOpen(true);
  };

  // show confirm delete dialog
  const showDeleteDialog = (id: number) => {
    confirmAlert({
      message: "Are you sure you want to delete this?",
      buttons: [
        {
          label: "Sure",
          onClick: () => handleDelete(id),
        },
        {
          label: "Cancel",
          onClick: () => {},
        },
      ],
    });
  };

  // handle delete doctor record
  const handleDelete = async (id: number) => {
    try {
      await deleteDoctor(id);
      loadDoctors();
    } catch (err) {
      setError("Failed to delete doctor");
    }
  };

  // handle close add/edit popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // handle save on add and edit
  const handleSave = async (updatedData) => {
    try {
      if (isEdit) {
        if (!updatedData.id) {
          setError("Doctor ID is missing for the update.");
          return;
        }
        await updateDoctor(updatedData.id, updatedData);
      } else {
        await createDoctor(updatedData);
      }
      loadDoctors();
      handleClosePopup();
    } catch (err) {
      setError("Failed to save doctor data");
    }
  };

  return (
    <div className="doctorComponent">
      <div className="doctorDetailsHead">
        <div>
          <h2>Doctors</h2>
        </div>
        <div className="search">
          <input
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <button className="addButton" onClick={() => handleAdd()}>
          Add New
        </button>
      </div>
      {loading ? (
        <div className="loadingScreen">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {error ? (
            <p className="error">{error}</p>
          ) : (
            <>
              {doctors.length === 0 ? (
                <p className="loadingScreen">No Doctors Found.</p>
              ) : (
                <>
                  <p className="totalRecords">Total Records: {totalRecords}</p>
                  <div className="listCardSection">
                    {doctors.map((doctor, index) => (
                      <div className="listCard" key={index}>
                        <div className="cardImage">
                          {doctor.image && (
                            <img src={doctor.image} alt="Doctor" />
                          )}
                        </div>
                        <div className="cardDetails">
                          <div className="information">
                            <h3>{doctor.title}</h3>
                            <p>{doctor.email}</p>
                            <p>{doctor.location}</p>
                            <p>{doctor.description}</p>
                          </div>
                          <div className="actions">
                            <img
                              src={editIcon}
                              alt="editIcon"
                              onClick={() => handleEdit(doctor)}
                              width="24px"
                            />
                            <img
                              src={deleteIcon}
                              alt="deleteIcon"
                              onClick={() => showDeleteDialog(doctor.id)}
                              width="18px"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
          {!loading && doctors.length > 0 && (
            <div className="paginationButtonHead">
              <button
                className="paginationButton"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
              <button
                className="paginationButton"
                disabled={page >= Math.ceil(totalRecords / limit)}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
      <AddEditModal
        isEdit={isEdit}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        data={popupData}
        onSave={handleSave}
      />
    </div>
  );
};

export default Doctor;
