import { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useLoginContext } from "../../context/LoginContext";
import { useUsers } from "../../hooks/users/useAllUsers";
import toast from "react-hot-toast";
import { useUpdatePasswordForUser } from "../../hooks/users/useResetPassword";
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

const UserRoleContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const UserInputGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SearchButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: background-color 0.3s;
  white-space: nowrap;
  height: fit-content;

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted};
  }
`;

const SearchButtonCancel = styled.button`
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: background-color 0.3s;
  white-space: nowrap;
  height: fit-content;

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted};
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

const UserInfo = styled.div`
  background-color: ${({ theme }) => theme.colors.lighter};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin: ${({ theme }) => theme.spacing.md} 0;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const UserInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  &:last-child {
    margin-bottom: 0;
  }
`;

const UserInfoLabel = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const UserInfoValue = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const NoUserMessage = styled.div`
  background-color: #fff3cd;
  color: #856404;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin: ${({ theme }) => theme.spacing.md} 0;
  border: 1px solid #ffeaa7;
  text-align: center;
`;

const PasswordRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const UserPasswordSettings = () => {
  // const [showSuccess, setShowSuccess] = useState(false);
  const [userFound, setUserFound] = useState(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const { cookies, userLogin, allRoles } = useLoginContext();
  const { isLoading, users, error } = useUsers(cookies, userLogin);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  if (error) toast.message(error.message);

  const { updatePasswordForUserFunc, isLoading: isLoadingUpdatePassword } =
    useUpdatePasswordForUser(reset);

  const userIdOrEmail = watch("userIdOrEmail");
  const newPassword = watch("newPassword");
  // const confirmPassword = watch("confirmPassword");

  // محاكاة البحث عن المستخدم
  const searchUser = () => {
    setSearchAttempted(true);
    if (userIdOrEmail) {
      // محاكاة البيانات - يمكنك استبدال هذا بـ API call حقيقي
      const mockUsers = {
        "ahmed@example.com": {
          name: "أحمد محمد",
          email: "ahmed@example.com",
          role: "employee",
          branch: "الفرع الرئيسي",
          id: "12345",
        },
        12345: {
          name: "أحمد محمد",
          email: "ahmed@example.com",
          role: "employee",
          branch: "الفرع الرئيسي",
          id: "12345",
        },
        "sara@example.com": {
          name: "سارة أحمد",
          email: "sara@example.com",
          role: "manager",
          branch: "فرع المدينة",
          id: "67890",
        },
        67890: {
          name: "سارة أحمد",
          email: "sara@example.com",
          role: "manager",
          branch: "فرع المدينة",
          id: "67890",
        },
      };

      const foundUser = users?.data?.data?.find((user) => {
        return (
          userIdOrEmail === user.email || userIdOrEmail === user.phoneNumber
        );
      });

      if (foundUser) {
        setUserFound(foundUser);
      } else {
        setUserFound(null);
      }
    } else {
      setUserFound(null);
    }
  };

  const onChangePassword = (data) => {
    if (!userFound) {
      toast.error("يرجى البحث عن المستخدم أولاً");
      return;
    }

    updatePasswordForUserFunc({
      cookies,
      userLogin,
      bodyObj: {
        userId: userFound._id,
        password: data.newPassword,
        passwordConfirm: data.confirmPassword,
      },
    });
  };

  const getRoleLabel = (roleValue) => {
    const roles = allRoles[userLogin.user.role];
    const role = roles.find((r) => r.value === roleValue);
    return role ? role.label : roleValue;
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onChangePassword)}>
        <FormGroup>
          <Label htmlFor="userSearch">البحث عن المستخدم</Label>
          <UserRoleContainer>
            <UserInputGroup>
              <Input
                id="userSearch"
                type="text"
                placeholder="أدخل رقم المستخدم أو الإيميل"
                {...register("userIdOrEmail", {
                  required: "رقم المستخدم أو الإيميل مطلوب",
                  pattern: {
                    value: /^(\d+|[^\s@]+@[^\s@]+\.[^\s@]+)$/,
                    message: "يرجى إدخال رقم صحيح أو إيميل صحيح",
                  },
                })}
                error={errors.userIdOrEmail}
              />
              {/* {errors.userIdOrEmail && (
                <ErrorMessage>{errors.userIdOrEmail.message}</ErrorMessage>
              )} */}
            </UserInputGroup>
            <SearchButton type="button" onClick={searchUser}>
              بحث
            </SearchButton>
            <SearchButtonCancel
              type="button"
              onClick={() => {
                setUserFound(null);
                setSearchAttempted(false);
                reset();
              }}
            >
              الغاء
            </SearchButtonCancel>
          </UserRoleContainer>
        </FormGroup>

        {userFound && (
          <UserInfo>
            <UserInfoRow>
              <UserInfoLabel>الاسم:</UserInfoLabel>
              <UserInfoValue>{userFound?.name}</UserInfoValue>
            </UserInfoRow>
            <UserInfoRow>
              <UserInfoLabel>الإيميل:</UserInfoLabel>
              <UserInfoValue>{userFound?.email}</UserInfoValue>
            </UserInfoRow>
            <UserInfoRow>
              <UserInfoLabel>رقم تليفون المستخدم:</UserInfoLabel>
              <UserInfoValue>{userFound?.phoneNumber}</UserInfoValue>
            </UserInfoRow>
            <UserInfoRow>
              <UserInfoLabel>الفرع:</UserInfoLabel>
              <UserInfoValue>{userFound?.branch?.name}</UserInfoValue>
            </UserInfoRow>
            <UserInfoRow>
              <UserInfoLabel>الصلاحية:</UserInfoLabel>
              <UserInfoValue>{getRoleLabel(userFound?.role)}</UserInfoValue>
            </UserInfoRow>
          </UserInfo>
        )}

        {searchAttempted && !userFound && userIdOrEmail && (
          <NoUserMessage>
            لم يتم العثور على مستخدم بهذا الرقم أو الإيميل
          </NoUserMessage>
        )}

        {userFound && (
          <PasswordRow>
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
              <Label htmlFor="confirmPassword">تأكيد كلمة المرور الجديدة</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  required: "يرجى تأكيد كلمة المرور",
                  validate: (value) =>
                    value === newPassword || "كلمة المرور غير متطابقة",
                })}
                error={errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
              )}
            </FormGroup>
          </PasswordRow>
        )}

        {userFound && (
          <Button type="submit" disabled={isLoadingUpdatePassword}>
            {isLoadingUpdatePassword ? <Spinner /> : "تغيير كلمة المرور"}
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default UserPasswordSettings;
