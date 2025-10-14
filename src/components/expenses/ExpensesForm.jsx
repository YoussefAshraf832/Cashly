import styled from "styled-components";
import { useExpensesContext } from "../../context/ExpensesContext";
import { useCreateExpense } from "../../hooks/expenses/useCreateExpense";
import { useLoginContext } from "../../context/LoginContext";
import { useHomeContext } from "../../context/HomeContext";
import Spinner from "../../utils/Spinner";

const StyledExpensesForm = styled.form`
  background-color: white;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.accent};
  }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.accent};
  }
`;

const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.accent};
  }
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.muted};
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: white;
  }
`;

function ExpensesForm() {
  const {
    handleSubmit,
    formData,
    handleInputChange,
    expenseTypes,
    setFormData,
  } = useExpensesContext();

  const { createExpenseFunc, isLoading } = useCreateExpense(setFormData);
  const { cookies, userLogin } = useLoginContext();
  const { selectedBranch } = useHomeContext();

  const handleCreate = function (e) {
    e.preventDefault();
    const bodyObj = {
      branchId: userLogin?.user?.branch?._id || selectedBranch,
      filter: formData.type,
      price: formData.amount,
      description: formData.description,
    };

    createExpenseFunc({ cookies, bodyObj });
  };

  return (
    <StyledExpensesForm onSubmit={handleCreate}>
      <h2>تسجيل مصروف جديد</h2>
      <FormRow>
        <FormGroup>
          <Label htmlFor="amount">المبلغ (ريال)</Label>
          <Input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
            min="0"
            step="0.01"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="type">نوع المصروف</Label>
          <Select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          >
            <option value="">اختر نوع المصروف</option>
            {expenseTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </FormGroup>

        {/* <FormGroup>
          <Label htmlFor="date">التاريخ</Label>
          <Input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </FormGroup> */}
      </FormRow>

      <FormRow>
        <FormGroup style={{ gridColumn: "1 / -1" }}>
          <Label htmlFor="description">الوصف</Label>
          <TextArea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
      </FormRow>

      <FormRow>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Spinner size="small" /> : "حفظ المصروف"}
        </Button>
        <SecondaryButton
          type="button"
          onClick={() =>
            setFormData({
              amount: "",
              type: "",
              date: new Date().toISOString().split("T")[0],
              description: "",
            })
          }
        >
          إلغاء
        </SecondaryButton>
      </FormRow>
    </StyledExpensesForm>
  );
}

export default ExpensesForm;
