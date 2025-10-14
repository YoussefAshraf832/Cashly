import { useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import { useLoginContext } from "../../context/LoginContext";
import { useBranchs } from "../../hooks/branch/useGetAllBranch";
import { useSignup } from "../../hooks/useSignup";
import Spinner from "../../utils/Spinner";
// import { useNavigate } from "react-router-dom";
// import { useOutsideClick } from "../../hooks/useOutSideClick";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  height: 75vh;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid
    ${({ error, theme }) => (error ? "#e74c3c" : theme.colors.secondary)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  transition: border-color 0.3s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ error, theme }) =>
      error ? "#e74c3c" : theme.colors.primary};
    box-shadow: ${({ error, theme }) =>
      error ? "0 0 0 2px rgba(231, 76, 60, 0.2)" : theme.shadows.accent};
  }
`;

// Custom Dropdown Components
const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid
    ${({ theme, error }) => (error ? "#e74c3c" : theme.colors.secondary)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  background-color: white;
  text-align: right;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border-color 0.3s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme, error }) =>
      error ? "#e74c3c" : theme.colors.primary};
    box-shadow: ${({ theme, error }) =>
      error ? "0 0 0 2px rgba(231, 76, 60, 0.2)" : theme.shadows.accent};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const DropdownArrow = styled.span`
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s;
  font-size: 12px;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-top: none;
  border-radius: 0 0 ${({ theme }) => theme.borderRadius.sm}
    ${({ theme }) => theme.borderRadius.sm};
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* تخصيص شكل الـ scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.lighter};
    border-radius: ${({ theme }) => theme.borderRadius.xs};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: ${({ theme }) => theme.borderRadius.xs};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const DropdownItem = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lighter};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.lighter};
  }

  &.selected {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

// Container للـ dropdowns جنب بعض
const DropdownsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const DropdownGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const Button = styled.button`
  width: fit-content;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;
  transition: background-color 0.3s;
  box-sizing: border-box;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.muted};
    cursor: not-allowed;
  }
`;

// Custom Dropdown Component
const CustomDropdown = ({ options, value, onChange, placeholder, error }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options?.find((option) => option.value === value);

  const handleSelect = (option) => {
    onChange(option?.value);
    setIsOpen(false);
  };

  const handleToggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <DropdownButton type="button" onClick={handleToggle} error={error}>
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <DropdownArrow isOpen={isOpen}>▼</DropdownArrow>
      </DropdownButton>

      {isOpen && (
        <DropdownList>
          {options?.map((option) => (
            <DropdownItem
              key={option.value}
              onClick={() => handleSelect(option)}
              className={value === option.value ? "selected" : ""}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

const CreateUserSettings = () => {
  const { cookies, userLogin, allRoles } = useLoginContext();
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const {
    isLoading: isLoadingBranchs,
    branchs,
    error,
  } = useBranchs(cookies, userLogin);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const { signupFunc, isLoading } = useSignup(reset);

  const password = watch("password");

  const roles = allRoles[userLogin?.user.role];

  if (error) toast.message(error.message);

  // الفروع الثابتة - غير قابلة للتعديل أو الحذف

  let branches = branchs?.map((obj) => {
    return {
      value: obj.id,
      label: obj.name,
    };
  });

  if (userLogin.user.role === "owner")
    branches?.unshift({ value: "all", label: "كل الفروع" });

  // الصلاحيات المتاحة

  const onCreateUser = (data) => {
    if (!selectedBranch) {
      toast.error("يرجى اختيار الفرع");
      return;
    }

    if (!selectedRole) {
      toast.error("يرجى اختيار الصلاحية");
      return;
    }

    const userData = {
      ...data,
      branch: selectedBranch,
      role: selectedRole,
    };

    signupFunc({ cookies, obj: userData });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onCreateUser)}>
        <FormGroup>
          <Label htmlFor="name">اسم المستخدم</Label>
          <Input
            id="name"
            type="text"
            {...register("name", {
              required: "اسم المستخدم مطلوب",
              minLength: {
                value: 2,
                message: "اسم المستخدم يجب أن يكون على الأقل حرفين",
              },
            })}
            error={errors.name}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phoneNumber">رقم المحمول</Label>
          <Input
            id="phoneNumber"
            type="number"
            {...register("phoneNumber", {
              required: "رقم المحمول مطلوب",
              minLength: {
                value: 11,
                message: "رقم المحمول غير صحيح",
              },
            })}
            error={errors.phoneNumber}
          />
          {errors.phoneNumber && (
            <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">ايميل المستخدم</Label>
          <Input
            id="email"
            type="text"
            // placeholder="أدخل الإيميل"
            {...register("email", {
              required: "رقم المستخدم أو الإيميل مطلوب",
              pattern: {
                value: /^(\d+|[^\s@]+@[^\s@]+\.[^\s@]+)$/,
                message: "يرجى إدخال رقم صحيح أو إيميل صحيح",
              },
            })}
            error={errors.email}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">كلمة المرور</Label>
          <Input
            id="password"
            type="password"
            {...register("password", {
              required: "كلمة المرور مطلوبة",
              minLength: {
                value: 6,
                message: "كلمة المرور يجب أن تكون على الأقل 6 أحرف",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message:
                  "كلمة المرور يجب أن تحتوي على حروف كبيرة وصغيرة وأرقام",
              },
            })}
            error={errors.password}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="passwordConfirm">تأكيد كلمة المرور</Label>
          <Input
            id="passwordConfirm"
            type="password"
            {...register("passwordConfirm", {
              required: "يرجى تأكيد كلمة المرور",
              validate: (value) =>
                value === password || "كلمة المرور غير متطابقة",
            })}
            error={errors.passwordConfirm}
          />
          {errors.passwordConfirm && (
            <ErrorMessage>{errors.passwordConfirm.message}</ErrorMessage>
          )}
        </FormGroup>

        {/* الـ dropdowns جنب بعض في الآخر */}
        <DropdownsContainer>
          <DropdownGroup>
            <Label>الصلاحية</Label>
            <CustomDropdown
              options={roles}
              value={selectedRole}
              onChange={setSelectedRole}
              placeholder="اختر الصلاحية"
              error={!selectedRole}
            />
            {!selectedRole && <ErrorMessage>يرجى اختيار الصلاحية</ErrorMessage>}
          </DropdownGroup>

          <DropdownGroup>
            <Label>الفرع</Label>
            {isLoadingBranchs ? (
              <Spinner />
            ) : (
              <CustomDropdown
                options={branches}
                value={selectedBranch}
                onChange={setSelectedBranch}
                placeholder="اختر الفرع"
                error={!selectedBranch}
              />
            )}
            {!selectedBranch && <ErrorMessage>يرجى اختيار الفرع</ErrorMessage>}
          </DropdownGroup>
        </DropdownsContainer>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : "إنشاء مستخدم جديد"}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateUserSettings;
