import { cumVigentes } from '@/mocks/cumVigentes'
import { formatCUM } from '@/utils'

describe('function to format CUM', () => {
  it('should return a string 20 length', () => {
    const [item1] = cumVigentes

    const result = formatCUM({
      atc: item1.atc,
      consecutivo: item1.consecutivocum,
      expediente: item1.expediente,
    })

    const CUM_LENGTH = 20

    expect(result).toHaveLength(CUM_LENGTH)
  })

  it('should have the correct format', () => {
    const [, item2] = cumVigentes

    const result = formatCUM({
      atc: item2.atc,
      consecutivo: item2.consecutivocum,
      expediente: item2.expediente,
    })

    expect(result).toMatch(/^\d{8}-\d{2}-\w{8}$/u)
  })
})
