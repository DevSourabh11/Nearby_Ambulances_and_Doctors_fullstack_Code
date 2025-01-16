import React, { useState, useEffect, useRef } from "react";
import "./Ambulance.css"; // Custom styles if needed
import {
  getAmbulances,
  createAmbulance,
  updateAmbulance,
  deleteAmbulance,
} from "../../services/apiService.ts";
import { confirmAlert } from "react-confirm-alert"; // Import the react-confirm-alert library
import "react-confirm-alert/src/react-confirm-alert.css"; // Import the default styling
import editIcon from "../../utils/Images/editIcon.svg";
import deleteIcon from "../../utils/Images/deleteIcon.svg";
import AddEditModal from "../../components/Modal/AddEditModal.tsx";

// interface for ambulance info
interface IAmbulance {
  id?: number;
  title: string;
  description: string;
  location: string;
  image?: string;
}

const Ambulance = () => {
  const [ambulances, setAmbulances] = useState<IAmbulance[]>([]);
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
    loadAmbulances();
  }, [page, search]);

  // initial fetch all ambulances data
  const loadAmbulances = async () => {
    setLoading(true);
    try {
      const response = await getAmbulances(page, limit, search);
      setAmbulances(response.data);
      setTotalRecords(response.total);
    } catch (err) {
      setError("Failed to load ambulances");
    } finally {
      setLoading(false);
    }
  };

  // handle search ambulance
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
      loadAmbulances();
    } else {
      // Debounce the search input for performance
      debounceRef.current = setTimeout(() => {
        setPage(1); // Reset to the first page
        loadAmbulances();
      }, 500); // Delay of 500ms
    }
  };

  // handle add ambulance
  const handleAdd = () => {
    setIsEdit(false); // Indicate this is for adding a new item
    setPopupData({}); // Clear popup data for a new item
    setIsPopupOpen(true); // Open the popup
  };

  // handle edit ambulance
  const handleEdit = (ambulance: IAmbulance) => {
    setIsEdit(true); // Indicate this is for editing an item
    setPopupData(ambulance); // Pass the selected item's data
    setIsPopupOpen(true); // Open the popup
  };

  // show confirm delete dialog
  const showDeleteDialog = (id) => {
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

  // handle delete ambulance record
  const handleDelete = async (id: number) => {
    try {
      await deleteAmbulance(id);
      loadAmbulances();
    } catch (err) {
      setError("Failed to delete ambulance");
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
          setError("Ambulance ID is missing for the update.");
          return;
        }
        await updateAmbulance(updatedData.id, updatedData); // Update existing ambulance
      } else {
        await createAmbulance(updatedData); // Add a new ambulance
      }
      loadAmbulances(); // Refresh the list
      handleClosePopup(); // Close the modal
    } catch (err) {
      setError("Failed to save ambulance data");
    }
  };

  return (
    <div className="ambulanceComponent">
      <div className="ambulanceDetailsHead">
        <div>
          <h2>Ambulance</h2>
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
              {ambulances.length === 0 ? (
                <p className="loadingScreen">No Ambulances Found.</p>
              ) : (
                <>
                  <p className="totalRecords">Total Records: {totalRecords}</p>
                  <div className="listCardSection">
                    {ambulances.map((ambulance, index) => (
                      <div className="listCard" key={index}>
                        <div className="cardImage">
                          {ambulance.image && (
                            <img src={ambulance.image} alt="Ambulance" />
                          )}
                        </div>
                        <div className="cardDetails">
                          <div className="information">
                            <h3>{ambulance.title}</h3>
                            <p>{ambulance.email}</p>
                            <p>{ambulance.location}</p>
                            <p>{ambulance.description}</p>
                          </div>
                          <div className="actions">
                            <img
                              src={editIcon}
                              alt="editIcon"
                              onClick={() => handleEdit(ambulance)}
                              width="24px"
                            />
                            <img
                              src={deleteIcon}
                              alt="deleteIcon"
                              onClick={() => showDeleteDialog(ambulance.id)}
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
          {!loading && ambulances.length > 0 && (
            <div className="paginaitonButtonHead">
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

export default Ambulance;
