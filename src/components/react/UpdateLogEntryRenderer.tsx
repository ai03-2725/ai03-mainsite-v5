import { statusToDisplayText, statusToIcon, statusToProgress } from '@scripts/util'
import { Icon } from '@iconify-icon/react/dist/iconify.mjs'
import type { APIUpdateEntry } from '@pages/api/updates/[projectId]'
import Markdown from 'react-markdown'
import { DefaultMarkdownRenderer } from './DefaultMarkdownRenderer';
import rehypeRewrite from 'rehype-rewrite'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'

export const UpdateLogEntryRenderer: React.FC<{
  update: APIUpdateEntry
}> = ({
  update
}) => {

  return (
    <div class="flex flex-row items-center mb-4 gap-4 justify-center md:justify-start">
      <div class="inline w-[64px] aspect-square h-[64px]">
        {/* TODO: Fix this */}
        <CircularProgressbarWithChildren 
          value={statusToProgress(update.status)} 
          styles={buildStyles({
            pathColor: `var(theme(colors.zinc.800))`,
            trailColor: `var(theme(colors.zinc.100))`,
          })}
        >
          <Icon icon={statusToIcon(update.status)} size={40} />
        </CircularProgressbarWithChildren>
      </div>
      <div>
        <h4 class="m-0 text-xl font-[550]">{statusToDisplayText(update.status)}</h4>
        <p>{update.date}</p>
      </div>
      <div class="grow">
        <DefaultMarkdownRenderer>
          <Markdown rehypePlugins={[[rehypeRewrite, {
            selector: 'img',
            rewrite: (node) => {
              if (node.type === 'element') {
                node.properties.loading = 'lazy';
              }
            }
          }]]}>
            {update.body}
          </Markdown>
        </DefaultMarkdownRenderer>
      </div>
    </div>
  )
}