import '@testing-library/jest-dom/extend-expect'

import { createSerializer } from '@emotion/jest'
import * as emotion from '@emotion/react'

expect.addSnapshotSerializer(createSerializer(emotion))
