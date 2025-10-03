import React from 'react'

type Props = {}

function JsonFormatter({ }: Props) {
    return (
        <div>
            <div className='grid grid-cols-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
                <pre className='col-span-2'>
                    <code className='language-json'>
                        {JSON.stringify({}, null, 2)}
                    </code>
                </pre>
            </div>
        </div>
    )
}

export default JsonFormatter