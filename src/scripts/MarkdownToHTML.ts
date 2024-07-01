import {remark} from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeRewrite from 'rehype-rewrite'


export const markdownToHTML = async (input: string) => {
  return await remark()
  .use(remarkRehype)
  .use(rehypeRewrite, {
    selector: 'img',
    rewrite: (node) => {
      if (node.type === 'element') {
        node.properties.loading = 'lazy';
      }
    }
  })
  .use(rehypeStringify)
  .process(input)
}