import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async(req,res)=>{
    try {
        const {name} = req.body
        if(!name){
            res.status(401).send({message:"CategoryName is required"})
        }
        //existing category
        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:"Category Already Exist"
            })
        }
        const category = await new categoryModel({name,slug:slugify(name)}).save();
        res.status(201).send({
            success:true,
            message:"create new category",
            category
        })
        

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Erro in category",
            error
        })
    }
};

// update Category
export const  updateCategoryController =async (req,res)=>{
    try {
        const {name} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:"Category Updated Successfully",
            category
        })
    } catch (error) {
        res.status(500),send({
            success:false,
            message:"Error in Update Category",
            error
        })
        
    }
}

// get category

export const categoryController = async(req,res)=>{
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:"All categoryList",
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while all getting categoris ",
            error
        })
        
    }
};

//single category get
export const singleCategoryController = async (req,res) =>{
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"Get single Category successfully",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"while getting in Single Category",
            error
        })
    }

}
//delete category
export const deleteCategoryController = async (req,res)=>{
    try {
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"Category Deleted Succesfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while  deleting Category",
            error
        })
    }

}