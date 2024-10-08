import { category } from "../models/category.js";

export const createCategory = async (req, res) => {
  try {
    const token = req.cookies.AuthToken;
    const { isActive, description, categoryName } = req.body;

   
    const categoryData = await category.create({
      description,
      categoryName,
      isActive,
    });

    if (categoryData) {
      res.status(200).json({
        status: true,
        message: "Category created sucsessfully!",
        data: { categoryData },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const UpdateCategory = async (req, res) => {
  try {
    const token = req.cookies.AuthToken;
    const { id } = req.params;
    const { isActive, description, categoryName } = req.body;
    console.log({ id });


    if (!id) {
      res.status(200).json({
        status: false,
        message: "your id is not correct",
      });
    }

    const updatedValue = await category.findByIdAndUpdate({ _id: id });
    updatedValue.categoryName = categoryName;
    updatedValue.isActive = isActive;
    updatedValue.description = description;
    await updatedValue.save();

    if (updatedValue) {
      res.status(200).json({
        status: true,
        message: "Category updated sucsessfully",
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Category not updated sucsessfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const DeleteCategory = async (req, res) => {
  try {
    const token = req.cookies.AuthToken;
    const { id } = req.params;
  
    if (!id) {
      res.status(200).json({
        status: false,
        message: "your id is not correct",
      });
    }
    const DeleteCategory = await category.findByIdAndDelete({ _id: id });
    if (DeleteCategory) {
      res.status(200).json({
        status: true,
        message: "Category Deleted sucsessfully",
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Category not deleted sucsessfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async (req, res) => {
  try {
  
    const categorylist = await category.find({});
    // console.log({categorylist})
    if (categorylist) {
      res.status(200).json({
        status: true,
        message: "Category fetched sucsessfully!",
        data: { categorylist },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryByID = async (req, res) => {
  try {
    const { id } = req.params;

   

    if (!id) {
      res.status(200).json({
        status: false,
        message: "your id is not correct",
      });
    }

    const categoryList = await category.findById({ _id: id });
    if (!categoryList) {
      res.status(200).json({
        status: false,
        message: "your id is not correct",
      });
    }
    if (categoryList) {
      res.status(200).json({
        status: true,
        message: "Category fetch sucsessfully!",
        data: { categoryList },
      });
    } else {
      res.status(200).json({
        status: false,
        message: "internal server error ",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
