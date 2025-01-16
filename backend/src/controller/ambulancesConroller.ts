import { Request, Response } from "express";

// // In-memory JSON data for ambulances
let ambulances = [
  {
    id: 1,
    title: "City Ambulance Service",
    description:
      "City Ambulance Service operates round the clock to ensure that every emergency is addressed with urgency and professionalism. Known for its reliable and fast response team, it provides top-notch care to patients in need of immediate assistance, regardless of the time or location.",
    location: "Downtown",
    image:
      "https://plus.unsplash.com/premium_photo-1723708841860-5b00cc402a62?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YW1idWxhbmNlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
  },
  {
    id: 2,
    title: "Rapid Care Ambulance",
    description:
      "Rapid Care Ambulance is equipped with state-of-the-art medical tools to handle complex emergencies. Catering primarily to urban areas, it has a reputation for its swift response and advanced equipment, ensuring patients receive timely and effective care.",
    location: "Uptown",
    image:
      "https://images.unsplash.com/photo-1604573798699-b16359862773?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YW1idWxhbmNlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
  },
  {
    id: 3,
    title: "Metro Health Ambulance",
    description:
      "Metro Health Ambulance specializes in providing critical care with the help of highly trained paramedics and modern facilities. It ensures that patients with severe medical conditions are transported with utmost safety and professionalism.",
    location: "Midtown",
    image:
      "https://images.unsplash.com/photo-1599700403969-f77b3aa74837?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW1idWxhbmNlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
  },
  {
    id: 4,
    title: "Express Medical Ambulance",
    description:
      "Express Medical Ambulance is dedicated to handling trauma cases with speed and precision. It provides quick access to hospitals and medical facilities, ensuring that every second counts in saving lives during emergencies.",
    location: "West End",
    image:
      "https://plus.unsplash.com/premium_photo-1664299503603-237d266dc7cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YW1idWxhbmNlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
  },
  {
    id: 5,
    title: "LifeLine Ambulance Service",
    description:
      "LifeLine Ambulance Service is committed to providing lifesaving transport services. With a focus on patient care and safety, it operates day and night to ensure that emergency medical needs are met promptly and efficiently.",
    location: "East Side",
    image:
      "https://images.unsplash.com/photo-1613066930974-1405455d91c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFtYnVsYW5jZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 6,
    title: "Guardian Ambulance",
    description:
      "Guardian Ambulance offers dependable services for all types of emergencies. Its team of trained responders and modern ambulances ensures that patients receive immediate care and are safely transported to the nearest medical facility.",
    location: "Central Park",
    image:
      "https://images.unsplash.com/photo-1705264895993-c544cf74a0c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFtYnVsYW5jZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 7,
    title: "First Response Ambulance",
    description:
      "First Response Ambulance is known for its high-tech facilities and trusted services. It specializes in efficient and reliable patient transport, ensuring that critical situations are handled with expertise and care.",
    location: "Harbor Area",
    image:
      "https://images.unsplash.com/photo-1712178565403-8398c7d7a266?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFtYnVsYW5jZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 8,
    title: "PrimeCare Ambulance",
    description:
      "PrimeCare Ambulance provides compassionate and timely care to patients in urban and rural areas alike. Its dedicated team ensures that every patient is treated with respect and dignity during their time of need.",
    location: "Suburban",
    image:
      "https://images.unsplash.com/photo-1650531213117-99cc7b5d8b33?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFtYnVsYW5jZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 9,
    title: "SafeRide Ambulance Service",
    description:
      "SafeRide Ambulance Service offers both emergency and non-emergency transport. Known for its safety standards and secure operations, it ensures that patients reach their destination with comfort and care.",
    location: "Old Town",
    image:
      "https://images.unsplash.com/photo-1507105306461-47f75f2da3aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFtYnVsYW5jZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 10,
    title: "VitalLink Ambulance",
    description:
      "VitalLink Ambulance connects patients to medical care with speed and precision. Its commitment to quality and reliability makes it a trusted choice for individuals and families in need of emergency medical transport.",
    location: "City Outskirts",
    image:
      "https://images.unsplash.com/photo-1599700403969-f77b3aa74837?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW1idWxhbmNlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
  },
  {
    id: 11,
    title: "ProHealth Ambulance",
    description:
      "ProHealth Ambulance is staffed with skilled professionals and equipped with modern medical equipment. Available 24/7, it ensures that patients receive timely and efficient care in their moment of need.",
    location: "Business District",
    image:
      "https://images.unsplash.com/photo-1524565026928-7c62b93cf22c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFtYnVsYW5jZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 12,
    title: "RescueNow Ambulance",
    description:
      "RescueNow Ambulance prioritizes patient safety and quick response in all emergencies. Its team is dedicated to providing high-quality care and ensuring a seamless transition to the nearest medical facility.",
    location: "Residential Area",
    image:
      "https://images.unsplash.com/photo-1712178565403-8398c7d7a266?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFtYnVsYW5jZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

// Controller to get all ambulance data

// to get all ambulance records
export const getAmbulances = (req: Request, res: Response): void => {
  try {
    const page = typeof req.query.page === "string" ? req.query.page : "1";
    const limit = typeof req.query.limit === "string" ? req.query.limit : "10";
    const search = typeof req.query.search === "string" ? req.query.search : "";
    // Ensure page and limit are numbers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    // Validate if page and limit are valid numbers
    if (isNaN(pageNumber) || isNaN(limitNumber)) {
      res
        .status(400)
        .json({ success: false, message: "Invalid page or limit values" });
      return;
    }
    const sortedAmbulances = [...ambulances].sort(
      (a: any, b: any) => b.id - a.id
    );
    const start: number = (pageNumber - 1) * limitNumber;
    const filteredAmbulances = sortedAmbulances.filter(
      (amb: any) =>
        amb.title.toLowerCase().includes(search.toLowerCase()) ||
        amb.description.toLowerCase().includes(search.toLowerCase()) ||
        amb.location.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedData = filteredAmbulances.slice(start, start + limitNumber);
    const finalRes = {
      data: paginatedData,
      total: ambulances.length,
    };
    res.status(200).send({
      success: true,
      data: finalRes,
    });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching ambulance data" });
  }
};

// to create new ambulance record
export const createAmbulances = (req: Request, res: Response): void => {
  try {
    const newAmbulance = { id: Date.now(), ...req.body };
    ambulances.push(newAmbulance);
    ambulances.sort((a: any, b: any) => b.id - a.id);
    res.status(201).send({
      success: true,
      data: newAmbulance,
    });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching ambulance data" });
  }
};

// to update ambulance record
export const updateAmbulance = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const index = ambulances.findIndex((amb) => amb.id === parseInt(id, 10));

    if (index !== -1) {
      ambulances[index] = { ...ambulances[index], ...req.body };
      res.status(200).send({
        success: true,
        data: ambulances[index],
      });
      return;
    } else {
      res.status(404).json({ error: "Ambulance not found" });
      return;
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching ambulance data" });
  }
};

// to delete ambulance record
export const deleteAmbulance = (req: Request, res: Response): void => {
  const { id } = req.params;
  try {
    const initialLength = ambulances.length;
    ambulances = ambulances.filter((amb) => amb.id !== parseInt(id, 10));
    if (ambulances.length < initialLength) {
      res.status(204).send({
        success: true,
      });
      return;
    } else {
      res.status(404).json({ error: "Ambulance not found" });
      return;
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching ambulance data" });
  }
};
