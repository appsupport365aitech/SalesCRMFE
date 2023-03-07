import React from "react";
import { getBasicIcon } from "../../utils/AssetsHelper";
import Button, { ButtonProps } from "@/utils/Button/Button";

const Kanban=({list}:KanbasProps)=>{
    // console.log(list);
    const leads = ["enquiry","interaction","proposal","win","Lost","Dead"];
    const titles = ["ENQUIRY","INTERACTION","PROPOSAL","WIN","LOST","DEAD"];
    return(
        <div className="px-[20px] mt-[10px] flex gap-[20px] h-[1200px] overflow-x-auto hide-scrollbar">
            {leads.map((col,i)=>{
                var res = list.filter(obj => {
                return obj.type === col
                })
                if(res.length)
                return(
                    <div className="flex gap-[20px]">
                        <div className="w-[270px] shrink-0 ">
                                <div className="leadName flex mb-[10px]">
                                    <div className="w-[76%] bg-renal-blue h-[45px] rounded-xl pl-[15px] pr-[15px] flex items-center justify-between">
                                        <div className="enq-header text-[13px] flex gap-[8px] items-center">
                                            <p className="">{titles[i]}</p>
                                            <div className="text-[10px] flex items-center bg-slate-400 px-[4px] h-[13px] rounded-[4px]">{res.length}</div>
                                        </div>
                                        <a href="#" className="flex items-center">...</a>
                                    </div>
                                    <div className="pl-[30px] h-[45px] bg-renal-blue rounded-xl flex items-center justify-center cursor-pointer ml-[15px] pr-[20px] relative p-[5px]"
                                    >
                                        {(
                                            <div className="absolute left-3  w-[28px]">
                                            <div className={`w-[100%] p-[3px] rounded-md }`}>
                                                <img
                                                src={getBasicIcon("Plus")}
                                                className={`w-[24px] svg-white`}
                                                alt=""
                                                />
                                            </div>
                                            </div>
                                        )}
                                        </div>
                                </div>
                                {res.map((item, i) => {
                                    return (
                                    <div className="border border-slate-600 p-[15px] rounded-xl mb-[20px] " key={i}>
                                        <div className="block-heading text-black text-[11px] leading-4 mb-[23px]">
                                            <p>Lead Id-{item.data.id}</p>
                                            <p className="text-bold">Lead XYZ-Info | {item.data.companyName} | {item.data.companyAddress}</p>
                                            <p className="text-black/50">{item.data.poc} | {item.data.pocJob}</p>
                                            <p className="text-black/50">{item.data.names}</p>
                                        </div>
                                        <div className="block-details text-black text-[10px] mb-[20px]">
                                            <div className="flex justify-between">
                                                <p className="text-black/[.65]">Last Activity:</p>
                                                <p className="text-black/[.35]">{item.data.lastActivity}</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p className="text-black/[.65]">Deal Size:</p>
                                                <p className="text-black/[.35]">Rs.{item.data.dealSize}</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p className="text-black/[.65]">Product/Service:</p>
                                                <p className="text-black/[.35]">{item.data.product}</p>
                                            </div>
                                        </div>
                                        <div className="quick-actions text-[10px] px-[9px] py-[5px] bg-slate-200 rounded-[12px] flex items-center justify-between">
                                            <p className="text-black/[.75] leading-[5px]">Quick Actions</p>
                                            <div className="icons flex gap-[4px] opacity-70">
                                            <img
                                                src={getBasicIcon("Phone")}
                                                className={`w-[14px]`}
                                                alt=""
                                            />
                                            <img
                                                src={getBasicIcon("Mail")}
                                                className={`w-[14px]`}
                                                alt=""
                                            />
                                            <img
                                                src={getBasicIcon("Calendar")}
                                                className={`w-[14px]`}
                                                alt=""
                                            />
                                            <img
                                                src={getBasicIcon("Tasks")}
                                                className={`w-[14px]`}
                                                alt=""
                                            />
                                            <img
                                                src={getBasicIcon("Chat")}
                                                className={`w-[14px]`}
                                                alt=""
                                            />
                                            </div>
                                        </div>
                                        <div className="px-[10px] py-[5px] text-[11px] text-black rounded-[14px] border border-black flex mt-[10px] opacity-80 gap-[4px]">
                                            <img
                                                src={getBasicIcon("Phone")}
                                                className={`w-[14px]`}
                                                alt=""
                                            />
                                            <p>{item.data.calls}</p>
                                            <img
                                                src={getBasicIcon("Attachment")}
                                                className={`w-[14px]`}
                                                alt=""
                                            />
                                            <p>{item.data.docs}</p>
                                            <img
                                                src={getBasicIcon("Chat")}
                                                className={`w-[14px]`}
                                                alt=""
                                            />
                                            <p>{item.data.chats}</p>
                                            <img
                                                src={getBasicIcon("Mail")}
                                                className={`w-[14px]`}
                                                alt=""
                                            />
                                            <p>{item.data.mails}</p>
                                            <img
                                                src={getBasicIcon("calendar")}
                                                className={`w-[14px]`}
                                                alt=""
                                            />
                                            <p>{item.data.meetings}</p>
                                            <img
                                                src={getBasicIcon("Tasks")}
                                                className={`w-[14px]`}
                                                alt=""
                                            />
                                            <p>{item.data.tasks}</p>
                                        </div>
                                    </div>
                                    );
                                })}
                        </div>
                        {i+1!=leads.length && <div className="border border-gray-200"></div>} 
                    </div> 
                    )
                })
            }
        </div>
    )}

export default Kanban;

interface KanbasProps{
    list:any[];
}