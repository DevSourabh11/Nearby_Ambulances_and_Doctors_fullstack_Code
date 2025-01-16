import { Request, Response } from "express";

// In-memory JSON data for doctors
let doctors = [
  {
    id: 1,
    title: "Dr. Robert Lee",
    description:
      "Dr. Robert Lee is an expert in emergency medicine with extensive experience in trauma care. He has handled critical accident cases for over a decade.",
    location: "Suburban Area",
    image:
      "https://plus.unsplash.com/premium_photo-1673953510197-0950d951c6d9?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Dr. Mary White",
    description:
      "Dr. Mary White is known for quick response and precision in emergency care. She specializes in advanced life support and critical resuscitation.",
    location: "West End",
    image:
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Dr. Emily Johnson",
    description:
      "Dr. Emily Johnson is a pediatric specialist focused on childhood wellness. She has extensive experience in immunization and preventive care.",
    location: "Downtown Clinic",
    image:
      "https://plus.unsplash.com/premium_photo-1664475543697-229156438e1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9jdG9ycyUyMGltYWdlfGVufDB8fDB8fHww",
  },
  {
    id: 4,
    title: "Dr. James Smith",
    description:
      "Dr. James Smith is a leading orthopedic surgeon specializing in sports injuries. He also excels in performing advanced joint replacement surgeries.",
    location: "North Side Hospital",
    image:
      "https://images.unsplash.com/photo-1666214277657-e60f05c40b04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9jdG9ycyUyMGltYWdlfGVufDB8fDB8fHww",
  },
  {
    id: 5,
    title: "Dr. Sarah Brown",
    description:
      "Dr. Sarah Brown is an experienced dermatologist offering advanced skin treatments. She is highly skilled in handling complex skin conditions.",
    location: "Central Medical Center",
    image:
      "https://plus.unsplash.com/premium_photo-1673953886006-0ec37a4ed2f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGRvY3RvcnMlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 6,
    title: "Dr. David Wilson",
    description:
      "Dr. David Wilson is a neurologist with expertise in stroke management. He is passionate about treating neurodegenerative disorders.",
    location: "East End Clinic",
    image:
      "https://plus.unsplash.com/premium_photo-1681966531074-0957dc900a5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRvY3RvcnMlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 7,
    title: "Dr. Susan Miller",
    description:
      "Dr. Susan Miller is a leading gynecologist focusing on women's health. She is well-known for her expertise in maternity care.",
    location: "Southern Healthcare Facility",
    image:
      "https://media.istockphoto.com/id/1203928517/photo/medical-concept-of-asian-beautiful-female-doctor-in-white-coat-with-stethoscope-waist-up.webp?a=1&b=1&s=612x612&w=0&k=20&c=UIQeT2pce8Gj95pOpBaH4QFIdv_PP4a_4nqPCnTYWjY=",
  },
  {
    id: 8,
    title: "Dr. Richard Davis",
    description:
      "Dr. Richard Davis is an oncologist specializing in personalized cancer treatments. He is actively involved in groundbreaking cancer research.",
    location: "Metro Cancer Institute",
    image:
      "https://media.istockphoto.com/id/1298800629/photo/portrait-of-confident-male-doctor-looking-at-camera.webp?a=1&b=1&s=612x612&w=0&k=20&c=zDglgekwTgR0ng2XiDRs0ZN3drnlXpB5smEmoBB243A=",
  },
  {
    id: 9,
    title: "Dr. Anna Garcia",
    description:
      "Dr. Anna Garcia is a skilled anesthesiologist with expertise in pain management. She ensures patient comfort during surgical procedures.",
    location: "Westwood Surgery Center",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9jdG9ycyUyMGltYWdlfGVufDB8fDB8fHww",
  },
  {
    id: 10,
    title: "Dr. Thomas Martinez",
    description:
      "Dr. Thomas Martinez is a renowned cardiologist specializing in advanced cardiac procedures. He is dedicated to preventive heart care.",
    location: "Green Valley Heart Institute",
    image:
      "https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9jdG9ycyUyMGltYWdlfGVufDB8fDB8fHww",
  },
  {
    id: 11,
    title: "Dr. Suru Gaga",
    description:
      "Dr. Suru Garcia is a skilled anesthesiologist with expertise in pain management. She ensures patient comfort during surgical procedures.",
    location: "Westwood Center",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9jdG9ycyUyMGltYWdlfGVufDB8fDB8fHww",
  },
];

// Controller to get all doctor data

// to get all doctor records
export const getDoctors = (req: Request, res: Response): void => {
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
    const start: number = (pageNumber - 1) * limitNumber;
    const sortedDoctors = [...doctors].sort((a: any, b: any) => b.id - a.id);
    const filteredDoctors = sortedDoctors.filter(
      (amb: any) =>
        amb.title.toLowerCase().includes(search.toLowerCase()) ||
        amb.description.toLowerCase().includes(search.toLowerCase()) ||
        amb.location.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedData = filteredDoctors.slice(start, start + limitNumber);
    const finalRes = {
      data: paginatedData,
      total: doctors.length,
    };
    res.status(200).send({
      success: true,
      data: finalRes,
    });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching doctor data" });
  }
};

// to create new doctor record
export const createDoctors = (req: Request, res: Response): void => {
  try {
    const newDoctor = { id: Date.now(), ...req.body };
    doctors.push(newDoctor);
    doctors.sort((a: any, b: any) => b.id - a.id);
    res.status(201).send({
      success: true,
      data: newDoctor,
    });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching doctor data" });
  }
};

// to update doctor record
export const updateDoctor = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const index = doctors.findIndex((amb) => amb.id === parseInt(id, 10));

    if (index !== -1) {
      doctors[index] = { ...doctors[index], ...req.body };
      res.status(200).send({
        success: true,
        data: doctors[index],
      });
      return;
    } else {
      res.status(404).json({ error: "Doctor not found" });
      return;
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching doctor data" });
  }
};

// to delete doctor record
export const deleteDoctor = (req: Request, res: Response): void => {
  const { id } = req.params;
  try {
    const initialLength = doctors.length;
    doctors = doctors.filter((amb) => amb.id !== parseInt(id, 10));
    if (doctors.length < initialLength) {
      res.status(204).send({
        success: true,
      });
      return;
    } else {
      res.status(404).json({ error: "Doctor not found" });
      return;
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching doctor data" });
  }
};
