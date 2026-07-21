'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo, 
  Minus,
  Type
} from 'lucide-react'
import { useEffect } from 'react'

interface TiptapEditorProps {
  content: string
  onChange: (html: string) => void
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[250px] max-h-[500px] overflow-y-auto p-4 bg-white rounded-b-2xl border-x border-b border-slate-200 outline-none text-[#444444] font-sans text-sm sm:text-base leading-relaxed',
      },
    },
  })

  // Synchronize editor content if it changes externally (e.g. on load or reset)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!editor) {
    return null
  }

  const toggleHeading = (level: 1 | 2 | 3) => {
    editor.chain().focus().toggleHeading({ level }).run()
  }

  return (
    <div className="flex flex-col w-full rounded-2xl overflow-hidden border border-slate-200">
      {/* Menu / Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-slate-200">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg hover:bg-slate-200 hover:text-slate-800 transition-colors ${
            editor.isActive('bold') ? 'bg-[#DCCFF8] text-[#444444] font-bold shadow-sm' : 'text-slate-500'
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg hover:bg-slate-200 hover:text-slate-800 transition-colors ${
            editor.isActive('italic') ? 'bg-[#DCCFF8] text-[#444444] font-bold shadow-sm' : 'text-slate-500'
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`p-2 rounded-lg hover:bg-slate-200 hover:text-slate-800 transition-colors ${
            editor.isActive('strike') ? 'bg-[#DCCFF8] text-[#444444] font-bold shadow-sm' : 'text-slate-500'
          }`}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-slate-200 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`p-2 rounded-lg hover:bg-slate-200 hover:text-slate-800 transition-colors ${
            editor.isActive('paragraph') ? 'bg-[#DCCFF8] text-[#444444] font-bold shadow-sm' : 'text-slate-500'
          }`}
          title="Paragraph"
        >
          <Type className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => toggleHeading(1)}
          className={`p-2 rounded-lg hover:bg-slate-200 hover:text-slate-800 transition-colors ${
            editor.isActive('heading', { level: 1 }) ? 'bg-[#DCCFF8] text-[#444444] font-bold shadow-sm' : 'text-slate-500'
          }`}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => toggleHeading(2)}
          className={`p-2 rounded-lg hover:bg-slate-200 hover:text-slate-800 transition-colors ${
            editor.isActive('heading', { level: 2 }) ? 'bg-[#DCCFF8] text-[#444444] font-bold shadow-sm' : 'text-slate-500'
          }`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => toggleHeading(3)}
          className={`p-2 rounded-lg hover:bg-slate-200 hover:text-slate-800 transition-colors ${
            editor.isActive('heading', { level: 3 }) ? 'bg-[#DCCFF8] text-[#444444] font-bold shadow-sm' : 'text-slate-500'
          }`}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-slate-200 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg hover:bg-slate-200 hover:text-slate-800 transition-colors ${
            editor.isActive('bulletList') ? 'bg-[#DCCFF8] text-[#444444] font-bold shadow-sm' : 'text-slate-500'
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg hover:bg-slate-200 hover:text-slate-800 transition-colors ${
            editor.isActive('orderedList') ? 'bg-[#DCCFF8] text-[#444444] font-bold shadow-sm' : 'text-slate-500'
          }`}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded-lg hover:bg-slate-200 hover:text-slate-800 transition-colors ${
            editor.isActive('blockquote') ? 'bg-[#DCCFF8] text-[#444444] font-bold shadow-sm' : 'text-slate-500'
          }`}
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          title="Horizontal Rule"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="flex-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 disabled:opacity-40 transition-colors"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-2 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 disabled:opacity-40 transition-colors"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
      
      {/* Vanilla style sheet inside Tiptap component for premium prose styling */}
      <style dangerouslySetInnerHTML={{__html: `
        .ProseMirror h1 {
          font-size: 1.875rem;
          line-height: 2.25rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .ProseMirror h2 {
          font-size: 1.5rem;
          line-height: 2rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .ProseMirror h3 {
          font-size: 1.25rem;
          line-height: 1.75rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .ProseMirror p {
          margin-bottom: 1rem;
        }
        .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .ProseMirror li {
          margin-bottom: 0.25rem;
        }
        .ProseMirror blockquote {
          border-left: 4px solid #DCCFF8;
          padding-left: 1rem;
          font-style: italic;
          color: #64748b;
          margin-bottom: 1rem;
        }
        .ProseMirror hr {
          border: 0;
          border-top: 1px solid #e2e8f0;
          margin: 1.5rem 0;
        }
      `}} />
    </div>
  )
}
