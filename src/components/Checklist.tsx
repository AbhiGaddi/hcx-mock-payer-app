import { useState } from "react";
import { properText } from "../utils/StringUtils";
import { ChecklistItem } from "../pages/Claims/ClaimDetails";
import { colorPicker } from "../utils/StringUtil";
import _ from "lodash";

interface ChecklistProps {
    checklist:ChecklistItem[],
    title:string,
    settled:boolean,
    type:"financial" | "medical" | "general" | "opd" | "coverage";
    onApprove?:(type:string,amount:number,remarks:string) => void;
    onReject?:(type:string) => void;
}

const Checklist:React.FC<ChecklistProps> = ({checklist,title,settled,type,onApprove,onReject}:ChecklistProps) => {
    const [title1, setTitle] = useState(title);
    const [remarks, setRemarks] = useState('');
    const [approvedAmount, setApprovedAmount] = useState(0);
    const [selected, setSelected] =  useState<Array<string>>([]);
    const [enableApprove, setEnableApproved] = useState(false);
    const [progressText, setProgressText] = useState(0);

    const selectChecklist = (value:string) => {
      const index = selected.indexOf(value);
      console.log("index", index, value);
      if (index > -1) { // only splice array when item is found
            selected.splice(index, 1); // 2nd parameter means remove one item only
      }else{
        selected.push(value);  
      }
      setSelected(_.uniq(selected));
      if(selected.length == checklist.length){
        setProgressText(100);
        setEnableApproved(true);
      }else{
        setEnableApproved(false);
        setProgressText(Math.round(selected.length/checklist.length*100));
      }
    }


    return(
        <div
        // ref={modal}
        // onFocus={() => onClose(true)}
        // onBlur={() => onClose(false)}
        className="w-full max-w-203 rounded-lg border-2 border-gray bg-white py-12 px-8 dark:bg-boxdark md:py-5 md:px-5 mb-3 "
    >
        <p className="pb-2 text-xl font-bold text-black dark:text-white sm:">
            {title}
        </p>
        <span className="mx-auto mb-6 inline-block h-1 w-25 rounded bg-primary"></span>
        <div className={"relative h-4 rounded-full bg-stroke dark:bg-strokedark mb-5 w-full"} >
            <div className={"absolute left-0 flex h-full items-center justify-center rounded-full bg-primary "}
              style={{width: `${progressText}%`}}>
              <p className="my-auto text-center text-[10px] font-bold leading-none text-white">
                {progressText}%
              </p>
            </div>
          </div>
        <div className="flex flex-col-reverse gap-5 xl:flex-row xl:justify-between mb-2">
            <div className="flex flex-col gap-4 sm:flex-row xl:gap-9">
                <div className="flex flex-col gap-2">
                {checklist.map((value,index) => {
                    return(
                    <label className="cursor-pointer">
                    <div className="relative flex items-center pt-0.5">
                      <input
                        type="checkbox"
                        className="taskCheckbox sr-only"
                        onChange={() => {selectChecklist(value.name)}}
                      />
                      <div className="box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark dark:bg-boxdark-2">
                        <span className="text-white opacity-0">
                          <svg
                            className="fill-current"
                            width="10"
                            height="7"
                            viewBox="0 0 10 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z"
                              fill=""
                            />
                          </svg>
                        </span>
                      </div>
                      <p>{value.name}</p>
                    </div>
                  </label>
                  
                    )
                })}
                </div>
                </div>
            </div>
            {type !== "general"  ?
             <div className="flex flex-col gap-5.5 w-full mt-10">
              {type !== "coverage" ?
              <>
             <div>
                <label className="mb-3 block text-black dark:text-white">
                  Approved Amount
                </label>
                <input
                  type="number"
                  min={0}
                  placeholder="Default Input"
                  value={approvedAmount}
                  onChange={(event) => setApprovedAmount(parseFloat(event.target.value))}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div> 
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Remarks
                </label>
                <textarea
                  rows={6}
                  placeholder="Default textarea"
                  value={remarks}
                  onChange={(event) => setRemarks(event.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
              </div>
              </> : null }
              {settled ?
               <div className="flex gap-5 mt-2">
                 <p className="font-semibold">{`${properText(type)} approval is complete`}</p>
               </div> 
              :<div className="flex gap-5 mt-2">
              <button className={"inline-flex rounded-full bg-[#13C296] py-1 px-3 text-sm font-medium text-white hover:bg-opacity-90 " + (enableApprove? "" : "opacity-50 cursor-not-allowed")}
              disabled={!enableApprove}
              onClick={() => {onApprove && onApprove(type,approvedAmount,remarks)}}>
              
            Approve
          </button>
          <button className={"inline-flex rounded-full bg-[#DC3545] py-1 px-3 text-sm font-medium text-white hover:bg-opacity-90 " + (enableApprove? "" : "opacity-50 cursor-not-allowed")}
          disabled={!enableApprove}
          onClick={() => {onReject && onReject(type)}}>
            Reject
          </button>
              </div>}
            </div> : null }
    </div>
        
    )
}

export default Checklist;