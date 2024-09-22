import React, { useState } from "react";
import "./styles.css";

// Component to display the list of healthcare services
const ServiceList = ({ services, handleEdit, handleDelete }) => {
  return (
    <div>
      <h2 className="service_header">Available Services</h2>
      {services.length > 0 ? (
        <ul className="styled-list">
          {services.map((service, index) => (
            <li key={index}>
              <h3 className="name">{service.name}</h3>
              <p className="desc">{service.description}</p>
              <p>Price: ${service.price}</p>
              <button className="edit-button" onClick={() => handleEdit(index)}>
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
              <hr className="line1" />
            </li>
          ))}
        </ul>
      ) : (
        <p>No services available.</p>
      )}
    </div>
  );
};

// Form to add a new service
const AddServiceForm = ({ handleAddService, errorMessage }) => {
  const [service, setService] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddService(service);
    setService({ name: "", description: "", price: "" });
  };

  return (
    <>
      <form className="styled-form" onSubmit={handleSubmit}>
        <h2>Add New Service</h2>
        <div className="inputfield">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={service.name}
            onChange={handleChange}
          />
        </div>
        <div className="inputfield">
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={service.description}
            onChange={handleChange}
          />
        </div>
        <div className="inputfield">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={service.price}
            onChange={handleChange}
          />
        </div>
        <button className="btn" type="submit">
          <span>add me</span>
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
      <hr />
    </>
  );
};

// Form to update an existing service
const UpdateServiceForm = ({
  serviceToEdit,
  handleUpdateService,
  cancelUpdate,
  errorMessage,
}) => {
  const [updatedService, setUpdatedService] = useState(serviceToEdit);

  const handleChange = (e) => {
    setUpdatedService({
      ...updatedService,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateService(updatedService);
  };

  return (
    <form className="styled-form1" onSubmit={handleSubmit}>
      <h2>Update Service</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={updatedService.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={updatedService.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={updatedService.price}
          onChange={handleChange}
        />
      </div>
      <div></div>
      <button type="submit">Update Service</button>
      <button onClick={cancelUpdate}>Cancel</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
};

// Main app component
const HealthcareServicesApp = () => {
  const [services, setServices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const isValidService = (service) => {
    return service.name && service.description && service.price;
  };
  const handleAddService = (service) => {
    if (isValidService(service)) {
      setServices([...services, service]);
      setErrorMessage("");
    } else {
      setErrorMessage("All fields must be filled out.");
    }
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setServiceToEdit({ ...services[index], index });
  };

  const handleUpdateService = (updatedService) => {
    if (isValidService(updatedService)) {
      const updatedServices = services.map((service, i) =>
        i === updatedService.index ? updatedService : service
      );
      setServices(updatedServices);
      setIsEditing(false);
      setErrorMessage("");
    } else {
      setErrorMessage("All fields must be filled out.");
    }
  };

  const handleDelete = (index) => {
    setServices((prevServices) => prevServices.filter((_, i) => i !== index));
  };

  const cancelUpdate = () => {
    setIsEditing(false);
    setErrorMessage("");
  };

  return (
    <div className="container">
      <h1>Healthcare Services</h1>
      {!isEditing ? (
        <>
          <AddServiceForm
            handleAddService={handleAddService}
            errorMessage={errorMessage}
          />
          <ServiceList
            services={services}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      ) : (
        <UpdateServiceForm
          serviceToEdit={serviceToEdit}
          handleUpdateService={handleUpdateService}
          cancelUpdate={cancelUpdate}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};

export default HealthcareServicesApp;

