import { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useCreateOwner } from "../hooks/useCreateOwner";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  direction: rtl;
  text-align: right;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  height: 75vh;
  direction: rtl;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const Label = styled.label`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-align: right;
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid
    ${({ error, theme }) => (error ? "#e74c3c" : theme.colors.secondary)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  transition: border-color 0.3s;
  text-align: right;
  direction: rtl;

  &:focus {
    outline: none;
    border-color: ${({ error, theme }) =>
      error ? "#e74c3c" : theme.colors.primary};
    box-shadow: ${({ error, theme }) =>
      error ? "0 0 0 2px rgba(231, 76, 60, 0.2)" : theme.shadows.accent};
  }

  &::placeholder {
    text-align: right;
    direction: rtl;
  }
`;

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
  text-align: right;
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
  align-self: flex-end;
  text-align: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.muted};
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
  border: 1px solid #c3e6cb;
  text-align: right;
  direction: rtl;
`;

const InfoText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.muted};
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-style: italic;
  text-align: right;
`;

const OwnerSignup = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { createOwnerFunc, isLoading } = useCreateOwner();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const onActivateOwner = (data) => {
    createOwnerFunc(data);
  };

  return (
    <Container>
      <Title>تفعيل حساب المالك</Title>

      <Form onSubmit={handleSubmit(onActivateOwner)}>
        <FormGroup>
          <Label htmlFor="name">اسم المالك</Label>
          <Input
            id="name"
            type="text"
            placeholder="أدخل اسم المالك"
            {...register("name", {
              required: "اسم المالك مطلوب",
              minLength: {
                value: 2,
                message: "اسم المالك يجب أن يكون على الأقل حرفين",
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
            type="tel"
            placeholder="01012345678"
            {...register("phoneNumber", {
              required: "رقم المحمول مطلوب",
              pattern: {
                value: /^01[0-2,5]{1}[0-9]{8}$/,
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
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            {...register("email", {
              required: "البريد الإلكتروني مطلوب",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "البريد الإلكتروني غير صحيح",
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
            placeholder="أدخل كلمة المرور"
            {...register("password", {
              required: "كلمة المرور مطلوبة",
              minLength: {
                value: 8,
                message: "كلمة المرور يجب أن تكون على الأقل 8 أحرف",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                message:
                  "كلمة المرور يجب أن تحتوي على حروف كبيرة وصغيرة وأرقام ورموز",
              },
            })}
            error={errors.password}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
          <InfoText>
            يجب أن تحتوي على حروف كبيرة وصغيرة وأرقام ورموز خاصة
          </InfoText>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="passwordConfirm">تأكيد كلمة المرور</Label>
          <Input
            id="passwordConfirm"
            type="password"
            placeholder="أعد إدخال كلمة المرور"
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

        <Button type="submit" disabled={isLoading}>
          تفعيل الحساب
        </Button>

        {showSuccess && (
          <SuccessMessage>تم تفعيل حساب المالك بنجاح</SuccessMessage>
        )}
      </Form>
    </Container>
  );
};

export default OwnerSignup;
