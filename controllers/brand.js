import { brand } from "../models/brand.js";

export const createBrand = async (req, res) => {
  try {
    const token = req.cookies.AuthToken;
    const { logoUrl, brandName, isActive } = req.body;

    // if (!token) {
    //   res.status(401).json({
    //     status: false,
    //     message: "login required",
    //   });
    // }

    const brandData = await brand.create({ logoUrl, brandName, isActive });

    if (brandData) {
      res.status(201).json({
        status: true,
        message: "brand created sucsessfully!",
        data: { brandData },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getBrand = async (req, res) => {
  try {
    const token = req.cookies.AuthToken;
 
    const brandlist = await brand.find({});
    // console.log({brandlist})
    if (brandlist) {
      res.status(201).json({
        status: true,
        message: "brand fetched sucsessfully!",
        data: { brandlist },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getBrandByID = async (req, res) => {
  try {
    const token = req.cookies.AuthToken;
    const { id } = req.params;


    if (!id) {
      res.status(402).json({
        status: false,
        message: "your id is not correct",
      });
    }

    const getBrandByids = await brand.findById({ _id: id });

    if (getBrandByids) {
      res.status(201).json({
        status: true,
        message: "brand fetch sucsessfully!",
        data: { getBrandByids },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateBrandById = async (req, res) => {
  try {
    const token = req.cookies.AuthToken;
    const { id } = req.params;
    const { logoUrl, brandName, isActive } = req.body;
    console.log({ id });

    // if (!token) {
    //   res.status(401).json({
    //     status: false,
    //     message: "login required",
    //   });
    // }

    if (!id) {
      res.status(402).json({
        status: false,
        message: "your id is not correct",
      });
    }

    const updatedValue = await brand.findByIdAndUpdate({ _id: id });
    updatedValue.brandName = brandName;
    updatedValue.isActive = isActive;
    updatedValue.logoUrl = logoUrl;
    await updatedValue.save();

    if (updatedValue) {
      res.status(200).json({
        status: true,
        message: "Brand updated sucsessfully",
      });
    } else {
      res.status(402).json({
        status: false,
        message: "Brand not updated sucsessfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const token = req.cookies.AuthToken;
    const { id } = req.params;
    // if (!token) {
    //   res.status(401).json({
    //     status: false,
    //     message: "login required",
    //   });
    // }
    if (!id) {
      res.status(402).json({
        status: false,
        message: "your id is not correct",
      });
    }
    const deleteBrand = await brand.findByIdAndDelete({ _id: id });
    if (deleteBrand) {
      res.status(200).json({
        status: true,
        message: "Brand Deleted sucsessfully",
      });
    } else {
      res.status(402).json({
        status: false,
        message: "Brand not deleted sucsessfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
