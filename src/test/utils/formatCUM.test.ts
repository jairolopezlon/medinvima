import { formatCUM } from '@/utils'

describe('function to format CUM', () => {
  it('should return a string 20 length', () => {
    const expediente = '19942122'
    const consecutivo = '24'
    const atc = 'A02BC01'

    const result = formatCUM({
      atc,
      consecutivo,
      expediente,
    })

    const CUM_LENGTH = 20

    expect(result).toHaveLength(CUM_LENGTH)
  })

  it('should have the correct format', () => {
    const expediente = '15678'
    const consecutivo = '1'
    const atc = 'A02BC01'

    const result = formatCUM({ atc, consecutivo, expediente })

    expect(result).toMatch(/^\d{8}-\d{2}-\w{8}$/u)
  })
})
