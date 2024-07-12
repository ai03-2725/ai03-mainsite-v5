import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import type React from "preact/compat";
import type { ProjectStatuses } from "src/content/enum";
import Circle from 'react-circle';
import { statusToIcon, statusToProgress } from "@scripts/util";

export const StatusProgressIndicator: React.FC<{
  status: ProjectStatuses,
  divClasses?: string,
  iconClasses?: string,
}> = ({
  status,
  divClasses,
  iconClasses,
}) => {
  return (
    <div class={`aspect-square relative ${divClasses}`}>
      <div class="absolute w-full h-full flex flex-col justify-center items-center">
        <Icon icon={statusToIcon(status)} class={`${iconClasses}`}/>
      </div>
      <div class="absolute w-full h-full flex flex-col justify-center items-center">
        <Circle progress={statusToProgress(status)} roundedStroke={true} lineWidth="25" responsive progressColor="#27272A" bgColor="#D4D4D8" showPercentage={false} />
      </div>
    </div>
  )
}