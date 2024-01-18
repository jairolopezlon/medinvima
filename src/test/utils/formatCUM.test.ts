import { formatCUM } from '@/utils'

describe('function to format CUM', () => {
  it('should return a string 20 length', () => {
    const expediente = '19942122'
    const consecutivo = '24'
    const atc = 'A02BC01'

    const result = formatCUM({ expediente, consecutivo, atc })

    expect(result).toHaveLength(20)
  })

  it('should have the correct format', () => {
    const expediente = '15678'
    const consecutivo = '1'
    const atc = 'A02BC01'

    const result = formatCUM({ expediente, consecutivo, atc })

    expect(result).toMatch(/^\d{8}-\d{2}-\w{8}$/)
  })
})
