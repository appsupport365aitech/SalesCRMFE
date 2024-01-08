import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavbarWithButton from "@/components/app/Navbar/NavbarWithButton";
import Backdrop from "@/components/View/Backdrop/Center";
import Navigator from "@/utils/customNavigator";
import { getBasicIcon } from "@/utils/AssetsHelper";
import Image from "next/image";
import axios from "axios";
import { useAppDispatch } from "@/store/store";
import { setError, setSuccess } from "@/store/ai";
import DeleteCategory from "@/components/Indicator/basic/deleteCategory";
import EditCategory from "@/components/Indicator/basic/editCategory";
import SimpleButton from "@/utils/Button/SimpleButton";
import NavigationWithEditAndDeleteButtons from "@/components/app/NavigationWithEditAndDelete";


const AddText = ({ title, place, change, value }: any) => {
  return (
    <div className="w-[100%]  mb-[15px]">
      <p className="w-[100%] text-[#8A9099] font-medium tracking-wide mb-[8px]">
        {title}
      </p>
      <input
        onChange={change}
        value={value}
        className="w-[100%] h-[41px] rounded-[14px] bg-transparent border-[2px] border-[#e4e4e4] text-[#3F434A] px-[14px] outline-none text-[14px] font-medium tracking-wide"
        type="text"
        name=""
        placeholder={place}
        id=""
      />
    </div>
  );
};


const AddScore = ({
  typeValue,
  scoreValue,
  disabled,
  handleChangeType,
  handleChangeScore,
  handleEditIndicatorType,
  handleDeleteIndicatorType,
}: any) => {
  return (
    <div className="flex items-center px-8 mt-4 gap-20">
      <div className="flex items-center gap-6">
        <div className="">
          <input
            value={typeValue}
            disabled={disabled}
            onInput={handleChangeType}
            type="text"
            className={`${!disabled ? "border-2 rounded-xl py-1 pl-3" : ""}`}
          />
        </div>{" "}
        {disabled && (
          <Image
            className="cursor-pointer"
            src={getBasicIcon("Edit")}
            alt=""
            // fill={true}
            width={20}
            height={20}
            style={{
              objectFit: "contain",
            }}
            onClick={handleEditIndicatorType}
          />
        )}
      </div>
      <div className="flex gap-6">
        <div className="w-[100px]">
          <input
            value={scoreValue}
            disabled={disabled}
            onInput={handleChangeScore}
            type="text"
            className={`outline-none ${!disabled ? "border-2 w-[100px] rounded-xl px-8 py-1" : "w-[100px]"}`}
          />
        </div>
        {disabled && (
          <Image
            className="cursor-pointer "
            src={getBasicIcon("Delete")}
            alt=""
            // fill={true}
            width={20}
            height={20}
            style={{
              objectFit: "contain",
            }}
            onClick={handleDeleteIndicatorType}
          />
        )}
      </div>{" "}
    </div>
  );
};


const Indicator = () => {
  const [apiData, setApiData] = useState([]);
  const [valuesApiData, setValuesApiData] = useState([]);

  const [indicatorTypes, setIndicatorTypes] = useState<any>([]);
  const [itClone, setItClone] = useState<any>([]);

  const [currIndicatorType, setCurrIndicatorType] = useState(0);
  const [currIndicatorCategory, setCurrIndicatorCategory] = useState(0);
  const [currIndicatorValue, setCurrIndicatorValue] = useState<any>(0);
  const [editCategoryIdx, setEditCategoryIdx] = useState<any>(0);

  const [delPopup, setDelPopup] = useState<any>({ open: false, payload: {} });
  const [indicatorSetting, setIndicatorSetting] = useState(false);
  const [indicatorCategoryScoring, setIndicatorCategoryScoring] = useState<any>(
    { open: false, payload: {} }
  );
  const [indicatorValueScoring, setIndicatorValueScoring] = useState<any>({
    open: false,
    payload: {},
  });
  const [editIndicatorCategory, setEditIndicatorCategory] = useState<any>({
    open: false,
    payload: {},
  });
  const [newIndicatorCategory, setNewIndicatorCategory] = useState<any>({
    open: false,
    payload: {},
  });
  const [editIndicatorValue, setEditIndicatorValue] = useState<any>({
    open: false,
    payload: {},
  });
  const [newIndicatorValue, setNewIndicatorValue] = useState<any>({
    open: false,
    payload: {},
  });
  const [currICTab, setCurrICTab] = useState(0);
  const [ICTabs, setICTabs] = useState([
    { id: 0, title: "Score Settings" },
    { id: 1, title: "Time Settings" },
  ]);
  const [scoreSettingSave, setScoreSettingSave] = useState<any>(true);
  const [bool, setBool] = React.useState(true);

  const dispatch = useAppDispatch();

  const formatData = (data: any) => {
    const newIndicators: any = [];
    data?.result?.forEach((item: any) => {
      let typeIdx = -1;
      if (
        newIndicators.find((it: any, index: number) => {
          typeIdx = index;
          return it?.key === item.type;
        })
      ) {
        let categoryIdx = -1;
        if (
          newIndicators[typeIdx].categories?.find((it: any, index: number) => {
            categoryIdx = index;
            return it?.key === item.category;
          })
        ) {
          if (!newIndicators[typeIdx].categories?.[categoryIdx]?.values) {
            newIndicators[typeIdx].categories[categoryIdx].values = [];
          }
          newIndicators[typeIdx].categories?.[categoryIdx]?.values?.push({
            oid: item._id,
            key: item.value,
            label: item.value,
            alternatives: item.alternative,
            scoreWeightage: parseInt(item?.score || "0"),
          });
        } else if (typeIdx !== -1) {
          newIndicators[typeIdx].categories.push({
            oid: item._id,
            key: item?.category,
            label: item?.category,
            scoreWeightage: 1,
          });
        }
      } else {
        newIndicators.push({
          oid: item._id,
          key: item?.type,
          label: item?.type,
          scoreWeightage: parseInt(item?.score || "0"),
          edit: false,
          categories: [
            {
              oid: item._id,
              key: item?.category,
              label: item?.category,
              scoreWeightage: 1,
              values: [{
                oid: item._id,
                key: item.value,
                label: item.value,
                alternatives: item.alternative,
                scoreWeightage: parseInt(item?.score || "0"),
              }]
            },
          ],
        });
      }
    });
    setIndicatorTypes(newIndicators);
    setItClone(newIndicators);
  };

  const getTypes = () => {
    // if sdr/bdm user then find-all otherwise getTypesById
    axios
      .get(
        "https://sales365.trainright.fit/api/indicator/find-all?page=0&limit=10"
      )
      .then((res: any) => {
        formatData(res.data);
      })
      .catch((err: any) => {
      });
  };

  const getTypesById = (id: any) => {
    axios
      .get(`https://sales365.trainright.fit/api/indicator/find-by-id?id=${id}`)
      .then((res: any) => {
        console.log("============ indicator : data ============", res);
      })
      .catch((err: any) => { });
  };

  const getValues = () => {
    axios
      .get(
        "https://sales365.trainright.fit/api/indicator/getIndicatorValues?userId=65782fb3cae5f857818476dd"
      )
      .then((res: any) => {
        console.log("============ indicator : data ============", res);
      })
      .catch((err: any) => { });
  };

  const deleteIndicatorById = (
    id: any,
    type: "INDICATOR" | "CATEGORY" | "VALUE" | any
  ) => {
    axios
      .delete(
        `https://sales365.trainright.fit/api/indicator/delete-by-id?id=${id}`
      )
      .then((res: any) => {
        if (type === "INDICATOR") {
          setIndicatorSetting(false);
        } else if (type === "CATEGORY") {
          setBool(false);
          setNewIndicatorCategory({ open: false, payload: {} });
          setIndicatorCategoryScoring({ open: false, payload: {} });
        } else if (type === "VALUE") {
          setBool(false);
          setNewIndicatorValue({ open: false, payload: {} });
          setIndicatorValueScoring({ open: false, payload: {} });
        }
        setDelPopup({ open: false, payload: {} });
        dispatch(
          setSuccess({
            show: true,
            success: `Deleted ${type.toLowerCase()} successfully.`,
          })
        );
        getTypes();
      })
      .catch((err: any) => {
        dispatch(
          setError({
            show: true,
            error: `Error Occured`,
          })
        );
      });
  };

  const updateIndicator = (
    payload: any,
    type: "INDICATOR" | "CATEGORY" | "VALUE"
  ) => {
    axios
      .put("https://sales365.trainright.fit/api/indicator/update", payload)
      .then((res: any) => {
        console.log("============ updateIndicator : res ============", res);
        if (type === "INDICATOR") {
          // setIndicatorSetting(false);
        } else if (type === "CATEGORY") {
          setBool(false);
          setIndicatorCategoryScoring({ open: false, payload: {} });
          setEditIndicatorCategory({ open: false, payload: {} });
        } else if (type === "VALUE") {
          setBool(false);
          setEditIndicatorValue({ open: false, payload: {} });
        }
        dispatch(
          setSuccess({
            show: true,
            success: `Successfully edited ${type.toLowerCase()}.`,
          })
        );
        getTypes();
      })
      .catch((err: any) => {
        dispatch(
          setError({
            show: true,
            error: "Error Occured!",
          })
        );
      });
  };

  const createIndicator = (
    payload: any,
    type: "INDICATOR" | "CATEGORY" | "VALUE" = "INDICATOR"
  ) => {
    axios
      .post("https://sales365.trainright.fit/api/indicator/create", payload)
      .then((res: any) => {
        if (type === "INDICATOR") {
          setIndicatorSetting(false);
        } else if (type === "CATEGORY") {
          setBool(false);
          setNewIndicatorCategory({ open: false, payload: {} });
          setIndicatorCategoryScoring({ open: false, payload: {} });
        } else if (type === "VALUE") {
          setBool(false);
          setNewIndicatorValue({ open: false, payload: {} });
          setIndicatorValueScoring({ open: false, payload: {} });
        }
        dispatch(
          setSuccess({
            show: true,
            success: `New ${type.toLowerCase()} created.`,
          })
        );
        getTypes();
      })
      .catch((err: any) => {
        dispatch(
          setError({
            show: true,
            error: "Error Occured!",
          })
        );
      });
  };

  const handleNewIndicatorType = () => {
    indicatorTypes?.forEach((indicatorType: any) => {
      if (indicatorType?.new === true) {
        createIndicator(
          {
            type: indicatorType.label,
            category: "",
            value: "",
            alternative: "",
            score: indicatorType.scoreWeightage,
            timeRestriction: "",
            comparisonType: "",
            speaker: "",
          },
          "INDICATOR"
        );
      } else if (indicatorType?.edit) {
        updateIndicator(
          {
            _id: indicatorType.oid,
            type: indicatorType.label,
            category: indicatorType.category,
            value: indicatorType.value,
            alternative: indicatorType.alternatives,
            score: indicatorType.scoreWeightage,
            timeRestriction: "",
            comparisonType: "",
            speaker: "",
          },
          "INDICATOR"
        );
      }
    });
  };

  const handleNewIndicatorCategory = () => {
    createIndicator(
      {
        type: indicatorTypes?.[currIndicatorType]?.label,
        category: newIndicatorCategory?.payload?.category,
        value: newIndicatorCategory?.payload?.value,
        alternative: newIndicatorCategory?.payload?.value,
        score: "",
        timeRestriction: "",
        comparisonType: "",
        speaker: "",
      },
      "CATEGORY"
    );
  };

  const handleNewIndicatorValue = () => {
    createIndicator(
      {
        type: indicatorTypes?.[currIndicatorType]?.label,
        category:
          indicatorTypes?.[currIndicatorType]?.categories?.[
            currIndicatorCategory
          ]?.label,
        value: newIndicatorValue?.payload?.value,
        alternative: newIndicatorValue?.payload?.alternatives,
        score: "",
        timeRestriction: "",
        comparisonType: "",
        speaker: "",
      },
      "VALUE"
    );
  };

  const setNewIndicatorTypeData = (idx: number, key: string, value: string) => {
    setIndicatorTypes((currIndicatorTypes: any) => {
      return currIndicatorTypes?.map((currIndicator: any, index: number) => {
        if (index === idx) {
          if (key === "score") {
            return {
              ...currIndicator,
              scoreWeightage: parseInt(value || "0"),
            };
          } else {
            return {
              ...currIndicator,
              label: value,
              key: value,
            };
          }
        } else {
          return currIndicator;
        }
      });
    });
  };

  const saveEditedValue = () => {
    updateIndicator(
      {
        _id: indicatorTypes?.[currIndicatorType]?.categories?.[
          currIndicatorCategory
        ]?.values?.[editIndicatorValue?.payload?.key]?.oid,
        type: indicatorTypes?.[currIndicatorType]?.label,
        category:
          indicatorTypes?.[currIndicatorType]?.categories?.[
            currIndicatorCategory
          ]?.label,
        value: editIndicatorValue?.payload?.value,
        alternative: editIndicatorValue?.payload?.alternatives,
        score: indicatorTypes?.[currIndicatorType]?.scoreWeightage || "0",
        timeRestriction: "",
        comparisonType: "",
        speaker: "",
      },
      "VALUE"
    );
  };

  const saveEditedCategoryScoring = () => {
    indicatorTypes?.[currIndicatorType]?.categories?.forEach(
      (categoryItem: any, index: number) => {
        if (categoryItem.edit == true && !categoryItem?.new) {
          updateIndicator(
            {
              _id: categoryItem?.oid,
              category: categoryItem?.label,
              // type: indicatorTypes?.[currIndicatorType]?.label,
              // score: indicatorTypes?.[currIndicatorType]?.scoreWeightage || "0",
              // value: editIndicatorValue?.payload?.value,
              // alternative: editIndicatorValue?.payload?.alternatives,
              // timeRestriction: "",
              // comparisonType: "",
              // speaker: "",
            },
            "CATEGORY"
          );
        } else if (categoryItem?.new) {
          createIndicator(
            {
              type: indicatorTypes?.[currIndicatorType]?.label,
              score: indicatorTypes?.[currIndicatorType]?.scoreWeightage,
              category: categoryItem?.label,
            },
            "CATEGORY"
          );
        }
      }
    );
  };

  const saveEditedValueScoring = () => {
    indicatorTypes?.[currIndicatorType]?.categories?.[
      currIndicatorCategory
    ]?.values?.forEach((valueItem: any, index: number) => {
      if (valueItem.new === true) {
        createIndicator(
          {
            type: indicatorTypes?.[currIndicatorType]?.label,
            category:
              indicatorTypes?.[currIndicatorType]?.categories?.[
                currIndicatorCategory
              ]?.label,
            value: valueItem?.label,
            alternative: "",
            score: indicatorTypes?.[currIndicatorType]?.scoreWeightage,
            timeRestriction: "",
            comparisonType: "",
            speaker: "",
          },
          "VALUE"
        );
      } else if (valueItem.edit == true && !valueItem?.new) {
        updateIndicator(
          {
            _id: valueItem?.oid,
            category: valueItem?.label,
            value: valueItem.label,
            // type: indicatorTypes?.[currIndicatorType]?.label,
            // score: indicatorTypes?.[currIndicatorType]?.scoreWeightage || "0",
            // value: editIndicatorValue?.payload?.value,
            // alternative: editIndicatorValue?.payload?.alternatives,
            // timeRestriction: "",
            // comparisonType: "",
            // speaker: "",
          },
          "VALUE"
        );
      }
    });
  };

  const handleDeleteSubmit = () => {
    let id = "";
    const type = delPopup?.payload?.type;
    if (type === "TYPE") {
      id = indicatorTypes?.[delPopup?.payload?.key]?.oid;
    } else if (type === "CATEGORY") {
      id =
        indicatorTypes?.[currIndicatorType]?.categories?.[
          delPopup?.payload?.key
        ]?.oid;
    } else if (type === "VALUE") {
      id =
        indicatorTypes?.[currIndicatorType]?.categories?.[currIndicatorCategory]
          ?.values?.[delPopup?.payload?.key]?.oid;
    }
    deleteIndicatorById(id, delPopup?.payload?.type);
  };

  useEffect(() => {
    getTypes();
  }, []);

  useEffect(() => {
    setCurrIndicatorCategory(0);
  }, [currIndicatorType]);

  //   const handleBeforeHistoryChange = () => {
  //     router.events.on("beforeHistoryChange", handleBeforeHistoryChange);
  //     router.beforePopState(() => {
  //       router.events.off("beforeHistoryChange", handleBeforeHistoryChange);
  //       return true;
  //     });
  //   };

  //   handleBeforeHistoryChange();

  //   return () => {
  //     router.events.off("beforeHistoryChange", handleBeforeHistoryChange);
  //   };
  // }, []);

  const handleIndicatorSettingClick = () => {
    setBool(true);
    setIndicatorSetting(!indicatorSetting);
  };

  const handleICTabNavigation = (val: any) => {
    setCurrICTab(val);
  };

  const cancelDelete = () => {
    setBool(true);
    setDelPopup({ open: !delPopup.open, payload: {} });
  };

  const cancelEdit = () => {
    setBool(false);
    setEditIndicatorCategory({ open: false, payload: {} });
  };
  const handleISCancel = () => {
    if (currICTab === 0) {
      let isEdit = false;
      indicatorTypes?.forEach((item: any) => {
        if (item?.edit) {
          isEdit = true;
        }
      });
      if (isEdit) {
        setIndicatorTypes((currIndicatorTypes: any) => {
          return currIndicatorTypes?.map((item: any) => {
            if (item?.key === "" || item?.label === "") {
              return null;
            } else {
              return { ...item, edit: false };
            }
          }).filter((item: any) => item !== null);
        });
      } else {
        setBool(false);
        setIndicatorSetting(false);
      }
    } else {
      setBool(false);
      setIndicatorSetting(false);
    }
  };

  const getScoreWeightageSum = (type?: "CATEGORY" | "VALUE" | null) => {
    if (type === "CATEGORY") {
      const sum = indicatorTypes?.[currIndicatorType]?.categories?.reduce(
        (acc: number, item: any) => {
          return acc + (isNaN(item?.scoreWeightage) ? 0 : item?.scoreWeightage);
        },
        0
      );
      return sum;
    } else if (type === "VALUE") {
      const sum = indicatorTypes?.[currIndicatorType]?.categories?.[
        currIndicatorCategory
      ]?.values?.reduce((acc: number, item: any) => {
        return acc + (isNaN(item?.scoreWeightage) ? 0 : item?.scoreWeightage);
      }, 0);
      return sum;
    } else {
      const sum = indicatorTypes?.reduce((acc: number, item: any) => {
        return acc + (isNaN(item?.scoreWeightage) ? 0 : item?.scoreWeightage);
      }, 0);
      // setScoreSettingSave(sum === 100);
      return sum;
    }
  };

  const addNewIndicatorType = () => {
    setIndicatorTypes([
      ...indicatorTypes,
      {
        key: "",
        label: "",
        scoreWeightage: 0,
        edit: true,
        categories: [],
        new: true,
      },
    ]);
  };

  const addNewIndicatorCategory = () => {
    setIndicatorTypes((currTypes: any) => {
      return currTypes?.map((typeItem: any, typeIdx: number) => {
        if (typeIdx === currIndicatorType) {
          return {
            ...typeItem,
            categories: [
              ...typeItem.categories,
              { key: "", label: "", scoreWeightage: 0, edit: true, new: true },
            ],
          };
        } else {
          return typeItem;
        }
      });
    });
  };

  const addNewIndicatorValue = () => {
    setIndicatorTypes((currTypes: any) => {
      return currTypes?.map((typeItem: any, typeIdx: any) => {
        if (typeIdx === currIndicatorType) {
          return {
            ...typeItem,
            categories: typeItem?.categories?.map(
              (catItem: any, catIdx: number) => {
                if (catIdx === currIndicatorCategory) {
                  const newCatItem = { ...catItem };
                  if (!catItem.values) newCatItem.values = [];
                  newCatItem.values.push({
                    key: "",
                    label: "",
                    new: true,
                    edit: true,
                    scoreWeightage: 0,
                    alternatives: "",
                  });
                  return newCatItem;
                } else {
                  return catItem;
                }
              }
            ),
          };
        } else {
          return typeItem;
        }
      });
    });
  };

  const handleEditIndicatorCategoryData = (payload: any) => {
    const { key, value } = payload;
    if (value) {
      setIndicatorTypes((currIndicatorTypes: any) => {
        return currIndicatorTypes?.map((currTypeItem: any, typeIdx: number) => {
          if (typeIdx === currIndicatorType) {
            return {
              ...currTypeItem,
              categories: currTypeItem.categories?.map(
                (categoryItem: any, categoryIdx: number) => {
                  if (categoryIdx === key) {
                    return {
                      ...categoryItem,
                      edit: true,
                      key: value,
                      label: value,
                    };
                  } else {
                    return categoryItem;
                  }
                }
              ),
            };
          } else {
            return currTypeItem;
          }
        });
      });
    } else {
      setIndicatorTypes((currIndicatorTypes: any) => {
        return currIndicatorTypes?.map((currTypeItem: any, typeIdx: number) => {
          if (typeIdx === currIndicatorType) {
            return {
              ...currTypeItem,
              categories: currTypeItem.categories?.map(
                (categoryItem: any, categoryIdx: number) => {
                  if (categoryIdx === key) {
                    return {
                      ...categoryItem,
                      edit: true,
                    };
                  } else {
                    return categoryItem;
                  }
                }
              ),
            };
          } else {
            return currTypeItem;
          }
        });
      });
    }
  };

  const handleEditValueData = (payload: any) => {
    const { key, value } = payload;
    if (value) {
      setIndicatorTypes((currIndicatorTypes: any) => {
        return currIndicatorTypes?.map((currTypeItem: any, typeIdx: number) => {
          if (typeIdx === currIndicatorType) {
            return {
              ...currTypeItem,
              categories: currTypeItem.categories?.map(
                (categoryItem: any, categoryIdx: number) => {
                  if (categoryIdx === currIndicatorCategory) {
                    return {
                      ...categoryItem,
                      values: categoryItem?.values?.map(
                        (valItem: any, valIdx: number) => {
                          if (valIdx === key) {
                            return {
                              ...valItem,
                              key: value,
                              label: value,
                            };
                          } else {
                            return valItem;
                          }
                        }
                      ),
                    };
                  } else {
                    return categoryItem;
                  }
                }
              ),
            };
          } else {
            return currTypeItem;
          }
        });
      });
    } else {
    }
  };

  const handleEditIndicatorType = (payload: any) => {
    const { key } = payload;
    setIndicatorTypes((currTypes: any) => {
      return currTypes?.map((typeItem: any, typeIdx: number) => {
        if (typeIdx === key) {
          return {
            ...typeItem,
            edit: true,
          };
        } else {
          return typeItem;
        }
      });
    });
  };

  const handleEditIndicatorValue = (payload: any) => {
    const { key } = payload;
    setCurrIndicatorValue(key);
    setBool(true);
    setEditIndicatorValue({
      open: true,
      payload: {
        key: key,
        value:
          indicatorTypes?.[currIndicatorType]?.categories?.[
            currIndicatorCategory
          ]?.values?.[key]?.key,
        alternatives:
          indicatorTypes?.[currIndicatorType]?.categories?.[
            currIndicatorCategory
          ]?.values?.[key]?.alternatives,
      },
    });
  };

  const handleDeleteIndicatorType = (payload: any) => {
    const { key } = payload;
    setBool(true);
    setDelPopup({
      open: true,
      payload: {
        key: key,
        type: "TYPE",
        label: indicatorTypes?.[key]?.key,
      },
    });
  };

  const handleDeleteIndicatorCategory = (payload: any) => {
    const { key } = payload;
    setBool(true);
    setDelPopup({
      open: true,
      payload: {
        key: key,
        type: "CATEGORY",
        label: indicatorTypes?.[currIndicatorType]?.categories?.[key]?.key,
      },
    });
  };

  const handleDeleteIndicatorValue = (payload: any) => {
    const { key } = payload;
    setCurrIndicatorValue(key);
    setBool(true);
    setDelPopup({
      open: true,
      payload: {
        key: key,
        type: "VALUE",
        label:
          indicatorTypes?.[currIndicatorType]?.categories?.[
            currIndicatorCategory
          ]?.values?.[key]?.key,
      },
    });
  };

  const handleAdd = (prev: any, next: any) => {
    if (next === 0) {
      setBool(true);
      setNewIndicatorCategory({ open: true });
    } else if (next === 1) {
      setBool(true);
      setNewIndicatorValue({ open: true });
    }
  };

  const handleAddScore = (prev: any, next: any) => {
    if (next === 0) {
      setBool(true);
      setIndicatorCategoryScoring({ open: true });
    } else if (next === 1) {
      setBool(true);
      setIndicatorValueScoring({ open: true });
    }
  };

  const formatString = (
    payload: any,
    type: "SEPARATE" | "COMBINE" = "SEPARATE"
  ) => {
    if (type === "SEPARATE") {
      return payload.split(",");
    } else {
      return payload?.join(",");
    }
  };

  const scoreSettingTab = () => {
    return (
      <>
        <div className="flex justify-between mt-4 pl-8 pr-16">
          <h4 className="font-bold text-center">Indicator Type</h4>
          <h4 className="font-bold text-center">
            Score Weightage <br /> (Out of 100)
          </h4>
        </div>
        <div>
          {indicatorTypes?.map((indicatorType: any, index: number) => (
            <div key={index} className="w-[100%]">
              <AddScore
                typeValue={indicatorType?.label}
                scoreValue={indicatorType?.scoreWeightage?.toString()}
                disabled={!indicatorType?.edit}
                handleChangeType={(e: any) =>
                  setNewIndicatorTypeData(index, "type", e.target.value)
                }
                handleChangeScore={(e: any) =>
                  setNewIndicatorTypeData(index, "score", e.target.value)
                }
                handleEditIndicatorType={() =>
                  handleEditIndicatorType({ key: index })
                }
                handleDeleteIndicatorType={() =>
                  handleDeleteIndicatorType({ key: index })
                }
              />
            </div>
          ))}
          <div className="px-8 flex mt-4 gap-20">
            <div className="w-[50%]">
              <button
                className=" mt-2 text-sm cursor-pointer text-[#304FFD]"
                onClick={addNewIndicatorType}
              >
                Add New Indicator Type
              </button>
            </div>
            <span className="text-green-500 mt-2 w-[120px]">
              Sum: {getScoreWeightageSum()}
            </span>
          </div>
          <div className="w-[100%] pb-4 mt-10 pr-5 flex justify-end">
            <SimpleButton
              theme={1}
              click={handleNewIndicatorType}
              text={"Save"}
              left={20}
              right={0}
            />
            <SimpleButton
              theme={2}
              click={handleISCancel}
              text={"Cancel"}
              left={20}
              right={0}
            />
          </div>
        </div>
      </>
    );
  };

  const timeSettingTab = () => {
    return (
      <>
        <div className="w-[100%] text-black px-[30px] pt-[20px]">
          <div className="flex justify-between px-3 pr-12">
            <h4 className="font-bold text-center">Indicator Type</h4>
            <div className="flex gap-10">
              <h4 className="font-bold text-center">
                Start Time <br /> (MM:SS)
              </h4>
              <h4 className="font-bold text-center">
                Ends Time <br /> (MM:SS)
              </h4>
            </div>
          </div>
          <table className="w-[100%] mt-4">
            {indicatorTypes?.map((indicatorType: any, index: number) => (
              <tr key={index} className="">
                <td className="pl-4 w-2/4 pt-3">{indicatorType?.label}</td>
                <td className="pl-[20px]">
                  <input
                    type="text"
                    className="w-[50px] mr-[6px] border-2 rounded-lg px-3 bg-white"
                    value={indicatorType?.startTimeMin || "00"}
                  />
                  <input
                    type="text"
                    className="w-[50px] mr-[6px] border-2 rounded-lg px-3 bg-white"
                    value={indicatorType?.startTimeSec || "00"}
                  />
                </td>

                <td className="">
                  <input
                    type="text"
                    className="w-[50px] mr-[6px] border-2 rounded-lg px-3 bg-white"
                    value={indicatorType?.endTimeMin || "00"}
                  />
                  <input
                    type="text"
                    className="w-[50px] mr-[6px] border-2 rounded-lg px-3 bg-white"
                    value={indicatorType?.endTimeSec || "00"}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
        <div className="w-[100%] mt-6 flex pr-4 py-6 justify-end">
          <SimpleButton
            theme={1}
            click={handleNewIndicatorType}
            text={"Save"}
            left={20}
            right={0}
          />
          <SimpleButton
            theme={2}
            click={handleISCancel}
            text={"Cancel"}
            left={20}
            right={0}
          />
        </div>
      </>
    );
  };

  return (
    <>
      {indicatorSetting && (
        <Backdrop bool={bool}>
          <div className="text-black">
            <Navigator
              width={false}
              callback={handleICTabNavigation}
              current={currICTab}
              list={ICTabs}
            />
            {currICTab === 0 ? scoreSettingTab() : timeSettingTab()}
          </div>
        </Backdrop>
      )}
      {indicatorCategoryScoring.open && (
        <Backdrop bool={bool}>
          <div className="w-[100%] text-black px-[30px] pt-[20px]">
            <h2 className="text-[24px] font-medium">
              Indicator Category Scoring
            </h2>
            <hr className="mt-4" />
            <div className="flex justify-between mt-4 pl-8 pr-16">
              <h4 className="font-bold text-center">Indicator Type</h4>
              <h4 className="font-bold text-center">
                Score Weightage <br /> (Out of 100 )
              </h4>
            </div>
            <div>
              {indicatorTypes?.[currIndicatorType]?.categories?.map(
                (categoryItem: any, index: number) => (
                  <div key={index} className="w-[100%]">
                    <AddScore
                      typeValue={categoryItem?.label}
                      scoreValue={categoryItem?.scoreWeightage}
                      disabled={!categoryItem?.edit}
                      handleChangeType={(e: any) =>
                        handleEditIndicatorCategoryData({
                          key: index,
                          value: e.target.value,
                        })
                      }
                      handleChangeScore={(e: any) => { }}
                      handleEditIndicatorType={() =>
                        handleEditIndicatorCategoryData({ key: index })
                      }
                      handleDeleteIndicatorType={() =>
                        handleDeleteIndicatorCategory({ key: index })
                      }
                    />
                  </div>
                )
              )}
              <div className="px-8 flex mt-4">
                <div className="w-3/4">
                  <button
                    className=" mt-2 text-sm cursor-pointer text-[#304FFD]"
                    onClick={addNewIndicatorCategory}
                  >
                    Add New Indicator Type
                  </button>
                </div>
                <span className="text-green-500 mt-2 w-[60px]">
                  Sum: {getScoreWeightageSum("CATEGORY")}
                </span>
              </div>
              <div className="w-[100%] pb-4 mt-10 pr-5 flex justify-end">
                <SimpleButton
                  theme={1}
                  click={() => saveEditedCategoryScoring()}
                  text={"Save"}
                  left={20}
                  right={0}
                />
                <SimpleButton
                  theme={2}
                  click={() => {
                    setBool(false);
                    setIndicatorCategoryScoring({ open: false });
                  }}
                  text={"Cancel"}
                  left={20}
                  right={0}
                />
              </div>
            </div>
          </div>
        </Backdrop>
      )}
      {indicatorValueScoring.open && (
        <Backdrop bool={bool}>
          <div className="w-[100%] text-black px-[30px] pt-[20px]">
            <h2 className="text-[24px] font-medium">Indicator Value Scoring</h2>
            <div className="flex justify-between mt-4 pl-8 pr-16">
              <h4 className="font-bold text-center">Indicator Type</h4>
              <h4 className="font-bold text-center">
                Score Weightage <br /> (Out of 100 )
              </h4>
            </div>
            <div>
              {indicatorTypes?.[currIndicatorType]?.categories?.[
                currIndicatorCategory
              ]?.values?.map((valueItem: any, index: number) => (
                <div key={index} className="w-[100%]">
                  <AddScore
                    typeValue={valueItem?.label}
                    scoreValue={valueItem?.scoreWeightage}
                    disabled={!valueItem?.edit}
                    handleChangeType={(e: any) =>
                      handleEditValueData({
                        key: index,
                        value: e.target.value,
                      })
                    }
                    handleChangeScore={(e: any) => { }}
                    handleEditIndicatorType={() =>
                      handleEditIndicatorValue({ key: index })
                    }
                    handleDeleteIndicatorType={() =>
                      handleDeleteIndicatorValue({ key: index })
                    }
                  />
                </div>
              ))}
              <div className="px-8 flex mt-4">
                <div className="w-3/4">
                  <button
                    className=" mt-2 text-sm cursor-pointer text-[#304FFD]"
                    onClick={addNewIndicatorValue}
                  >
                    Add New Indicator Type
                  </button>
                </div>
                <span className="text-green-500 mt-2 w-[60px]">
                  Sum: {getScoreWeightageSum("VALUE")}
                </span>
              </div>
              <div className="w-[100%] pb-4 mt-10 pr-5 flex justify-end">
                <SimpleButton
                  theme={1}
                  click={() => saveEditedValueScoring()}
                  text={"Save"}
                  left={20}
                  right={0}
                />
                <SimpleButton
                  theme={2}
                  click={() => {
                    setBool(false);
                    setIndicatorValueScoring({ open: false });
                  }}
                  text={"Cancel"}
                  left={20}
                  right={0}
                />
              </div>
            </div>
          </div>
        </Backdrop>
      )}
      {delPopup.open && (
        <Backdrop bool={bool}>
          <DeleteCategory
            submit={handleDeleteSubmit}
            cancel={cancelDelete}
            title={delPopup?.payload?.label}
          />
        </Backdrop>
      )}
      {editIndicatorValue.open && (
        <Backdrop bool={bool}>
          <div className="w-[100%] h-[100%] py-[10px] pl-[30px] pr-[40px]  relative">
            <h2 className="text-[#3f434a] text-[31px] font-medium mb-[24px] tracking-[1px]">
              Edit Indicator Value
            </h2>
            <div
              className="w-[30px] h-[30px] cursor-pointer rounded-xl absolute top-[20px] right-[30px] flex items-center justify-center bg-[#f8f8f8]"
              onClick={() => {
                setBool(false);
                setEditIndicatorValue({ open: false, payload: {} });
              }}
            >
              <Image
                className="w-[15px] h-[15px]"
                src={getBasicIcon("Cross")}
                width={15}
                height={15}
                alt=""
              />
            </div>
            <AddText
              title="Indicator Value Name"
              place={"Indicator Value Name"}
              value={editIndicatorValue?.payload?.value}
              change={(e: any) => {
                setBool(true);
                setEditIndicatorValue({
                  open: true,
                  payload: {
                    ...editIndicatorValue.payload,
                    value: e.target.value,
                  },
                });
              }}
            />
            <AddText
              title="Alternate Values for the Indicator Value"
              place={"Enter Comma Seperated Values"}
              value={editIndicatorValue?.payload?.alternatives}
              change={(e: any) => {
                setBool(true);
                setEditIndicatorValue({
                  open: true,
                  payload: {
                    ...editIndicatorValue.payload,
                    alternatives: e.target.value,
                  },
                });
              }}
            />
            <div className="w-[100%] flex justify-end">
              <SimpleButton
                theme={1}
                click={saveEditedValue}
                text={"Save"}
                left={20}
                right={0}
              />
            </div>
          </div>
        </Backdrop>
      )}
      {editIndicatorCategory.open && (
        <Backdrop bool={bool}>
          <EditCategory
            submit={() => saveEditedCategoryScoring()}
            cancel={cancelEdit}
            value={
              indicatorTypes?.[currIndicatorType]?.categories?.[
                currIndicatorCategory
              ]?.label
            }
            onChange={(e: any) =>
              handleEditIndicatorCategoryData({
                key: currIndicatorCategory,
                value: e.target.value,
              })
            }
          />
        </Backdrop>
      )}
      {newIndicatorValue.open && (
        <Backdrop bool={bool}>
          <div className="w-[100%] h-[100%] py-[10px] pl-[30px] pr-[40px]  relative">
            <h2 className="text-[#3f434a] text-[31px] font-medium mb-[24px] tracking-[1px]">
              New Indicator Value
            </h2>
            <div
              className="w-[30px] h-[30px] cursor-pointer rounded-xl absolute top-[20px] right-[30px] flex items-center justify-center bg-[#f8f8f8]"
              onClick={() => {
                setBool(false);
                setNewIndicatorValue({ open: false, payload: {} });
              }}
            >
              <Image
                className="w-[15px] h-[15px]"
                src={getBasicIcon("Cross")}
                width={15}
                height={15}
                alt=""
              />
            </div>
            <AddText
              title="Add New Indicator Value"
              place={"Indicator Value Name"}
              change={(e: any) => {
                setBool(true);
                setNewIndicatorValue({
                  open: true,
                  payload: {
                    ...newIndicatorValue.payload,
                    value: e.target.value,
                  },
                });
              }}
            />
            <AddText
              title="Alternative Values For The Indicator Value"
              place={"Enter Comma Seperated Values"}
              change={(e: any) => {
                setBool(true);
                setNewIndicatorValue({
                  open: true,
                  payload: {
                    ...newIndicatorValue.payload,
                    alternatives: e.target.value,
                  },
                });
              }}
            />
            <div className="w-[100%] flex justify-end">
              <SimpleButton
                theme={1}
                click={handleNewIndicatorValue}
                text={"Save"}
                left={20}
                right={0}
              />
            </div>
          </div>
        </Backdrop>
      )}
      {newIndicatorCategory.open && (
        <Backdrop bool={bool}>
          <div className="w-[100%] h-[100%] py-[10px] pl-[30px] pr-[40px]  relative">
            <h2 className="text-[#3f434a] text-[31px] font-medium mb-[24px] tracking-[1px]">
              New Indicator Category
            </h2>
            <div
              className="w-[30px] h-[30px] cursor-pointer rounded-xl absolute top-[20px] right-[30px] flex items-center justify-center bg-[#f8f8f8]"
              onClick={() => {
                setBool(false);
                setNewIndicatorCategory({ open: false, payload: {} });
              }}
            >
              <Image
                className="w-[15px] h-[15px]"
                src={getBasicIcon("Cross")}
                width={15}
                height={15}
                alt=""
              />
            </div>
            <AddText
              title="Indicator Category Name"
              place={"Indicator Category Name"}
              value={newIndicatorCategory?.payload?.category}
              change={(e: any) => {
                {
                  setBool(true);
                  setNewIndicatorCategory({
                    open: true,
                    payload: {
                      ...newIndicatorCategory.payload,
                      category: e.target.value,
                    },
                  });
                }
              }}
            />{" "}
            <AddText
              title="Add New Indicator Value"
              place={"Indicator Value Name"}
              value={newIndicatorCategory?.payload?.value}
              change={(e: any) => {
                setBool(true);
                setNewIndicatorCategory({
                  open: true,
                  payload: {
                    ...newIndicatorCategory.payload,
                    value: e.target.value,
                  },
                });
              }}
            />{" "}
            <AddText
              title="Alternative values for the indicator value"
              place={"Enter Comma Seperated Values"}
              value={newIndicatorCategory?.payload?.alternatives}
              change={(e: any) => {
                setBool(true);
                setNewIndicatorCategory({
                  open: true,
                  payload: {
                    ...newIndicatorCategory.payload,
                    alternatives: e.target.value,
                  },
                });
              }}
            />
            <div className="w-[100%] flex justify-end">
              <SimpleButton
                theme={1}
                click={handleNewIndicatorCategory}
                text={"Save"}
                left={20}
                right={0}
              />
            </div>
          </div>
        </Backdrop>
      )}
      <NavbarWithButton
        src="Indicators"
        mainTitle={`Indicators > ${itClone?.[currIndicatorType]?.label}`}
        title={
          itClone?.[currIndicatorType]?.categories?.[currIndicatorCategory]
            ?.label
        }
        buttons={[
          {
            text: "Indicator Settings",
            dropdown: true,
            id: 1,
            icon: "Settings",
            light: false,
            dark: true,
            onClick1: handleIndicatorSettingClick,
            list: [],
          },
        ]}
      />
      <div className="w-[100%] bg-white pt-6 min-h-[90vh] pl-[20px] pr-[10px] flex">
        <div className="flex flex-col gap-4 bg-[#F0F0F0] rounded-3xl">
          <h2 className="bg-[#909193] text-white font-bold text-xl p-4 px-12 rounded-tl-2xl">
            Indicator Types
          </h2>
          <ul className="flex flex-col gap-4 items-center text-black">
            {itClone?.map((item: any, index: number) => (
              <li
                key={index}
                onClick={() => setCurrIndicatorType(index)}
                value={item?.key}
                className={`${currIndicatorType == index ? "text-bg-red" : ""
                  } font-medium cursor-pointer`}
              >
                {item?.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#fe50430c] p-4 w-[80%]">
          <div className="w-[70%] flex items-start justify-between ">
            {itClone?.[currIndicatorType]?.categories?.map(
              (it: any, index: number) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrIndicatorCategory(index);
                  }}
                  className={
                    currIndicatorCategory === index
                      ? "focus:outline-none text-white bg-bg-red  font-medium rounded-lg text-md px-7 py-2"
                      : "text-black font-medium text-md px-7 py-2"
                  }
                >
                  {it?.label}
                </button>
              )
            )}
          </div>
          <hr className="mt-4" />
          <NavigationWithEditAndDeleteButtons
            title={
              itClone?.[currIndicatorType]?.categories?.[currIndicatorCategory]
                ?.label
            }
            buttons={[
              {
                text: "Score",
                dropdown: true,
                id: 0,
                click: handleAddScore,
                light: false,
                dark: true,
                list: itClone?.[currIndicatorType]?.categories?.length !== 0 &&
                  itClone?.[currIndicatorType]?.categories?.[
                    currIndicatorCategory
                  ]?.label !== ""
                  ? [
                    { id: 0, title: "Indicator Category Score" },
                    { id: 1, title: "Indicator Value Score" },
                  ]
                  : [
                    { id: 0, title: "Indicator Category Score" },
                  ],
                value: 0,
              },
              {
                text: "Add",
                dropdown: true,
                id: 1,
                icon: "Plus",
                click: handleAdd,
                light: false,
                dark: false,
                list:
                  itClone?.[currIndicatorType]?.categories?.length !== 0 &&
                    itClone?.[currIndicatorType]?.categories?.[
                      currIndicatorCategory
                    ]?.label !== ""
                    ? [
                      { id: 0, title: "Indicator Category" },
                      { id: 1, title: "Indicator Value" },
                    ]
                    : [{ id: 0, title: "Indicator Category" }],
              },
            ]}
            leftBtns={
              itClone?.[currIndicatorType]?.categories?.length !== 0 &&
                itClone?.[currIndicatorType]?.categories?.[currIndicatorCategory]
                  ?.label !== ""
                ? [
                  {
                    icon: "Edit",
                    dropdown: false,
                    id: 1,
                    dark: false,
                    light: true,
                    list: [],
                    onClick1: () => {
                      handleEditIndicatorCategoryData({
                        key: currIndicatorCategory,
                      });
                      setBool(true);
                      setEditIndicatorCategory({
                        open: true,
                        payload: {
                          value:
                            itClone?.[currIndicatorType]?.categories?.[
                              currIndicatorCategory
                            ]?.label,
                        },
                      });
                    },
                  },
                  {
                    icon: "Delete",
                    dropdown: false,
                    id: 2,
                    dark: false,
                    light: true,
                    list: [],
                    onClick1: () =>
                      handleDeleteIndicatorCategory({
                        key: currIndicatorCategory,
                      }),
                  },
                ]
                : []
            }
          />
          <div>
            <div className="flex justify-between w-[80%]">
              <h4 className="text-gray-600 font-semibold">Indicator Value</h4>
              <h4 className="text-gray-600 font-semibold">
                Alternative Values
              </h4>
              <h4 className="text-gray-600 font-semibold">Score</h4>
            </div>
            <hr className="mt-2" />

            {itClone?.[currIndicatorType]?.categories?.[
              currIndicatorCategory
            ]?.values?.map((data: any, index: number) => (
              <div key={index}>
                <div className=" w-[99%] flex items-center justify-between">
                  <div className=" h-[auto] flex justify-between items-center w-[80%] py-4">
                    <h4 className="text-gray-600 font-semibold">
                      {data?.label}
                    </h4>
                    <div className="flex flex-col gap-3">
                      {formatString(data?.alternatives)?.map((item: any) => (
                        <h4
                          key={item.id}
                          className="text-gray-600 font-semibold"
                        >
                          {item}
                        </h4>
                      ))}
                    </div>
                    <h4 className="text-gray-600 font-semibold">
                      {data.scoreWeightage}
                    </h4>
                  </div>
                  <div className="flex mt-6 gap-4 w-[10%] h-[62px]">
                    <button
                      className="w-[20px] h-[20px]"
                      onClick={() => handleEditIndicatorValue({ key: index })}
                    >
                      <Image
                        src={getBasicIcon("Edit")}
                        alt=""
                        // fill={true}
                        width={30}
                        height={30}
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    </button>
                    <button
                      className="w-[20px] h-[20px]"
                      onClick={() => handleDeleteIndicatorValue({ key: index })}
                    >
                      <Image
                        src={getBasicIcon("Delete")}
                        alt=""
                        // fill={true}
                        width={30}
                        height={30}
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    </button>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Indicator;
