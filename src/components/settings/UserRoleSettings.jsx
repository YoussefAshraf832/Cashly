import { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ButtonSecondary } from "../../utils/Buttons";
import { useUsers } from "../../hooks/users/useAllUsers";
import { useLoginContext } from "../../context/LoginContext";
import { useBranchs } from "../../hooks/branch/useGetAllBranch";
import { useUpdateUser } from "../../hooks/users/useUpdateUser";
import toast from "react-hot-toast";
import Spinner, { PageSpinner } from "../../utils/Spinner";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  height: 65vh;
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

const RoleSelectGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SettingsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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

// const ErrorMessage = styled.span`
//   color: #e74c3c;
//   font-size: ${({ theme }) => theme.fontSizes.sm};
//   margin-top: ${({ theme }) => theme.spacing.xs};
// `;

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

// Custom Dropdown Component
const CustomDropdown = ({ options, value, onChange, placeholder, error }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (option) => {
    onChange(option.value);
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

const UserRoleSettings = () => {
  // const [showSuccess, setShowSuccess] = useState(false);
  const [userFound, setUserFound] = useState(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  const { cookies, userLogin, allRoles } = useLoginContext();
  const { isLoading, users, error } = useUsers(cookies, userLogin);
  const {
    isLoading: isLoadingBranchs,
    branchs,
    error: errBranchs,
  } = useBranchs(cookies, userLogin);

  const { updateUserFunc, isLoading: isLoadingUpdate } =
    useUpdateUser(setUserFound);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  if (error) toast.error(error.message);
  if (errBranchs) toast.error(errBranchs.message);

  if (isLoading || isLoadingBranchs) return <Spinner size="xlarge" />;

  const userIdOrEmail = watch("userIdOrEmail");

  // محاكاة البحث عن المستخدم
  const handleCancel = () => {
    reset();
    setSearchAttempted(false);
    setUserFound(null);
  };

  const searchUser = () => {
    setSearchAttempted(true);
    if (userIdOrEmail && userIdOrEmail.trim()) {
      // محاكاة البيانات - يمكنك استبدال هذا بـ API call حقيقي
      const foundUser = users?.data?.data?.find((user) => {
        return (
          userIdOrEmail === user.email || userIdOrEmail === user.phoneNumber
        );
      });

      if (foundUser) {
        setUserFound(foundUser);
        setSelectedRole(foundUser.role);
        if (foundUser.role) {
          setSelectedBranch("");
        } else setSelectedBranch(foundUser.branch.name);
      } else {
        setUserFound(null);
        setSelectedRole("");
        setSelectedBranch("");
      }
    } else {
      setUserFound(null);
      setSelectedRole("");
      setSelectedBranch("");
    }
  };

  const onChangeSettings = () => {
    if (!userFound) {
      alert("يرجى البحث عن المستخدم أولاً");
      return;
    }

    if (!selectedRole || !selectedBranch) {
      alert("يرجى اختيار الصلاحية والفرع الجديد");
      return;
    }

    updateUserFunc({
      cookies,
      userLogin,
      bodyObj: {
        updateUserId: userFound._id,
        roleUpdate: selectedRole,
        branchUpdateId:
          branchs?.find((obj) => obj.name === selectedBranch)?._id || null,
      },
    });
  };

  const roles = allRoles[userLogin?.user.role];

  const branches = branchs?.map((obj) => {
    return { value: `${obj.name}`, label: `${obj.name}` };
  });

  if (userLogin.user.role === "owner")
    branches?.unshift({ value: "all", label: "كل الفروع" });

  const getRoleLabel = (roleValue) => {
    const role = roles.find((r) => r.value === roleValue);
    return role ? role.label : roleValue;
  };

  const getBranchLabel = (branchValue) => {
    const branch = branches.find((b) => b.value === branchValue);
    return branch ? branch.label : branchValue;
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onChangeSettings)}>
        <FormGroup>
          <Label htmlFor="userSearch">البحث عن المستخدم</Label>
          <UserRoleContainer>
            <UserInputGroup>
              <Input
                id="userSearch"
                type="text"
                placeholder="أدخل رقم تليفون أو الإيميل المستخدم"
                {...register("userIdOrEmail", {
                  required: "رقم المستخدم أو الإيميل مطلوب",
                  pattern: {
                    value: /^(\d+|[^\s@]+@[^\s@]+\.[^\s@]+)$/,
                    message: "يرجى إدخال رقم صحيح أو إيميل صحيح",
                  },
                })}
                error={errors.userIdOrEmail}
              />
              {errors.userIdOrEmail && (
                <ErrorMessage>{errors.userIdOrEmail.message}</ErrorMessage>
              )}
            </UserInputGroup>
            <SearchButton type="button" onClick={searchUser}>
              بحث
            </SearchButton>
            <SearchButtonCancel type="button" onClick={handleCancel}>
              الغاء
            </SearchButtonCancel>
          </UserRoleContainer>
        </FormGroup>

        {/* عرض معلومات المستخدم إذا تم العثور عليه */}
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
              <UserInfoLabel>الفرع الحالي:</UserInfoLabel>
              <UserInfoValue>
                {getBranchLabel(userFound?.branch?.name)}
              </UserInfoValue>
            </UserInfoRow>
            <UserInfoRow>
              <UserInfoLabel>الصلاحية الحالية:</UserInfoLabel>
              <UserInfoValue>{getRoleLabel(userFound?.role)}</UserInfoValue>
            </UserInfoRow>
          </UserInfo>
        )}

        {/* رسالة عدم العثور على المستخدم */}
        {searchAttempted && !userFound && userIdOrEmail && (
          <NoUserMessage>
            لم يتم العثور على مستخدم بهذا الرقم أو الإيميل
          </NoUserMessage>
        )}

        {/* اختيار الصلاحية والفرع الجديد */}
        {userFound && (
          <SettingsRow>
            <FormGroup>
              <Label>الصلاحية الجديدة</Label>
              <CustomDropdown
                options={roles}
                value={selectedRole}
                onChange={setSelectedRole}
                placeholder="اختر الصلاحية"
                error={!selectedRole && searchAttempted}
              />
              {!selectedRole && searchAttempted && (
                <ErrorMessage>يرجى اختيار الصلاحية الجديدة</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>الفرع الجديد</Label>
              <CustomDropdown
                options={branches}
                value={selectedBranch}
                onChange={setSelectedBranch}
                placeholder="اختر الفرع"
                error={!selectedBranch && searchAttempted}
              />
              {/* {!selectedBranch && searchAttempted && (
                <ErrorMessage>يرجى اختيار الفرع الجديد</ErrorMessage>
              )} */}
            </FormGroup>
          </SettingsRow>
        )}

        {/* زر تغيير الإعدادات */}
        {userFound && (
          <Button type="submit" disabled={isLoadingUpdate}>
            {isLoadingUpdate ? <Spinner /> : "تحديث إعدادات المستخدم"}
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default UserRoleSettings;
