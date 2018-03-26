import React from 'react'

const editUrl =
  'https://gitlab.ta.philips.com/blockchain-lab/' +
  'blockchain-lab.gitlab-pages.ta.philips.com/blob/master/src/pages'

export const EditFile = ({ fileAbsolutePath }) => {
  const fileName = fileAbsolutePath.split('/').pop()
  return <div>
    <a href={`${editUrl}/${fileName}`}>Edit this page</a>
  </div>
}
