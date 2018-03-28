import React from 'react'

const editUrl =
  'https://gitlab.ta.philips.com/react-fontend-developer/' +
  'react-frontend-developer/blob/master/workspaces/homepage/src/pages'

export const EditFile = ({ fileAbsolutePath }) => {
  const fileName = fileAbsolutePath.split('/').pop()
  return <div>
    <a href={`${editUrl}/${fileName}`}>Edit this page</a>
  </div>
}
