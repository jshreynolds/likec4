import { describe } from 'vitest'
import { test } from './asserts'

describe.concurrent('comments', () => {
  test('line comment').valid`
    // line1
    specification { // }
      element container
      /// line2
    }
  `

  test('line comment').invalid`
    // line1
       next line
    specification {
      element container
    }
  `

  test('block comment').valid`
    /* block 1 */
    specification {
      element container
      /*
        block 2
      */
    }
  `
})
