import { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useUpdateMyPassword } from "../../hooks/useUpdatePassword";
import { useLoginContext } from "../../context/LoginContext";
import Spinner from "../../utils/Spinner";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
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
  border: 1px solid
    ${({ error, theme }) => (error ? "#e74c3c" : theme.colors.secondary)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ error, theme }) =>
      error ? "#e74c3c" : theme.colors.primary};
    box-shadow: ${({ error, theme }) =>
      error ? "0 0 0 2px rgba(231, 76, 60, 0.2)" : theme.shadows.accent};
  }
`;

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
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
  align-self: flex-start;

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
`;

const PasswordSettings = () => {
  const { cookies } = useLoginContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const { updateMyPasswordFunc, isLoading } = useUpdateMyPassword(reset);

  const password = watch("newPassword");

  const onChangePassword = (data) => {
    updateMyPasswordFunc({
      cookies,
      obj: {
        currentPassword: data?.currentPassword,
        passwordConfirm: data?.passwordConfirm,
        password: data?.newPassword,
      },
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onChangePassword)}>
        <FormGroup>
          <Label htmlFor="currentPassword">كلمة المرور الحالية</Label>
          <Input
            id="currentPassword"
            type="password"
            {...register("currentPassword", {
              required: "كلمة المرور الحالية مطلوبة",
              minLength: {
                value: 6,
                message: "كلمة المرور يجب أن تكون على الأقل 6 أحرف",
              },
            })}
            error={errors.currentPassword}
          />
          {errors.currentPassword && (
            <ErrorMessage>{errors.currentPassword.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
          <Input
            id="newPassword"
            type="password"
            {...register("newPassword", {
              required: "كلمة المرور الجديدة مطلوبة",
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
            error={errors.newPassword}
          />
          {errors.newPassword && (
            <ErrorMessage>{errors.newPassword.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="passwordConfirm">تأكيد كلمة المرور الجديدة</Label>
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

        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : "تغيير كلمة المرور"}
        </Button>
      </Form>
    </Container>
  );
};

export default PasswordSettings;
