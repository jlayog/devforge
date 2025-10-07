type JsonFormatterProps = {
  value: unknown | string
  indent?: number
}

export default function JsonFormatter({ value, indent = 2 }: JsonFormatterProps) {
  let formatted = ''

  if (typeof value === 'string') {
    // Try to parse JSON strings; otherwise show the raw string as-is
    try {
      const parsed = JSON.parse(value)
      formatted = JSON.stringify(parsed, null, indent)
    } catch {
      formatted = value
    }
  } else {
    try {
      formatted = JSON.stringify(value, null, indent)
    } catch {
      formatted = '[Unserializable value]'
    }
  }

  return (
    <div>
      <div className='mt-1 w-full h-40 rounded-md border border-gray-200 bg-gray-100 p-3 shadow-sm font-mono text-sm text-gray-900
           dark:border-gray-700 dark:bg-gray-900  dark:text-gray-100 hover:shadow-md focus:outline-indigo-600"'>
        <pre className=''>
          <code className='language-json'>
            {formatted}
          </code>
        </pre>
      </div>
    </div>
  )
}