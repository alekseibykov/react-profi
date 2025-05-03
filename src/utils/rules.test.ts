import dayjs from 'dayjs';
import { rules } from './rules';

describe('rules', () => {
  describe('required rule', () => {
    it('should use default message', () => {
      const rule = rules.required();
      expect(rule).toEqual({ required: true, message: 'Обязательное поле' });
    });

    it('should use custom message', () => {
      const rule = rules.required('Custom message');
      expect(rule).toEqual({ required: true, message: 'Custom message' });
    });
  });

  describe('isDateAfter rule', () => {
    const errorMessage = 'Date must be today or in the future';
    const validator = rules.isDateAfter(errorMessage)();

    it('should handle date validations correctly', async () => {
      const today = dayjs();
      const tomorrow = dayjs().add(1, 'day');
      const yesterday = dayjs().subtract(1, 'day');
      
      await expect(validator.validator(null, today)).resolves.toBeUndefined();
      await expect(validator.validator(null, tomorrow)).resolves.toBeUndefined();
      await expect(validator.validator(null, yesterday)).rejects.toThrow(errorMessage);
    });
  });
}); 