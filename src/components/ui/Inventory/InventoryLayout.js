import React, { useState } from "react";
import Functionalities from "./Functionalities/Functionalities";
import CategoriesTable from "./table";
import FullScreeeSpinner from "../../common/loading/FullScreee";
import ModalWrapper from "../../common/modal/ModalWrapper";
import AddItem from "./AddItem/AddItem";
import CategoryModal from "./CategoryModal/CategoryModal";

const InventoryLayout = ({
  loading,
  setSearchKey,
  searchKey,
  category,
  setCategory,
  selectedCategory,
  setSelectedCategory,
  categoriesData,
}) => {
  const [generatingId, setGeneratingId] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [supplierModalOpen, setSupplierModalOpen] = useState(false);
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);

  const handleCategoryButton = () => {
    try {
      setCategoryModalOpen(!categoryModalOpen);
    } catch (error) {
    } finally {
    }
  };
  const handleSupplierButton = () => {
    try {
      setSupplierModalOpen(!supplierModalOpen);
    } catch (error) {
    } finally {
    }
  };
  const handleAddItemButton = () => {
    try {
      setAddItemModalOpen(!addItemModalOpen);
    } catch (error) {
    } finally {
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-2">
        {/* Functionalities */}
        <div className="">
          <Functionalities
            searchKey={searchKey}
            setSearchKey={setSearchKey}
            category={category}
            setCategory={setCategory}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            generatingId={generatingId}
            handleCategoryButton={handleCategoryButton}
            handleSupplierButton={handleSupplierButton}
            handleAddItemButton={handleAddItemButton}
          />
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-[200px]">
            <FullScreeeSpinner />
          </div>
        ) : (
          // {/* List Table */}
          <CategoriesTable categoriesData={categoriesData} />
        )}
        {/*Category Modal */}
        <ModalWrapper
          title={"Category"}
          open={categoryModalOpen}
          handleClose={()=>setCategoryModalOpen(!categoryModalOpen)}
        >
          <CategoryModal
            // getAllDoctorsData={getAllDoctorsData}
            // handleClose={handleClick}
          />
        </ModalWrapper>
        {/*Supplier Modal */}
        <ModalWrapper
          title={"Supplier"}
          open={supplierModalOpen}
          handleClose={()=>setSupplierModalOpen(!supplierModalOpen)}
        >
          {/* <AddDoctor
            getAllDoctorsData={getAllDoctorsData}
            handleClose={handleClick}
          /> */}
        </ModalWrapper>
        {/*Add item Modal */}
        <ModalWrapper
          title={"Add Item"}
          open={addItemModalOpen}
          handleClose={()=>setAddItemModalOpen(!addItemModalOpen)}
        >
          <AddItem
            // getAllDoctorsData={getAllDoctorsData}
            // handleClose={handleClick}
          />
        </ModalWrapper>
      </div>
    </div>
  );
};

export default InventoryLayout;
