import { useState, useEffect } from "react";
import styled from "styled-components";
import { useUsers } from "../../hooks/users/useAllUsers";
import { useLoginContext } from "../../context/LoginContext";
import { useBranchs } from "../../hooks/branch/useGetAllBranch";
import { useUpdateActiveUser } from "../../hooks/users/useUserActivation";
import { useDeleteUser } from "../../hooks/users/useDeleteUser";
import Spinner from "../../utils/Spinner";
import toast from "react-hot-toast";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    align-items: stretch;
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin: 0;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterLabel = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
`;

// Custom Dropdown Components
const DropdownContainer = styled.div`
  position: relative;
  min-width: 200px;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
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
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.accent};
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

// Users List Container
const UsersListContainer = styled.div`
  height: 65vh;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: white;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const UserCard = styled.div`
  background-color: ${({ theme }) => theme.colors.lighter};
  padding: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  &:first-child {
    margin-top: ${({ theme }) => theme.spacing.md};
  }

  &:last-child {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const UserHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const UserName = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin: 0;
`;

// Container للصلاحية والأزرار
const RoleAndActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: flex-start;
    width: 100%;
  }
`;

const UserRole = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
`;

// أزرار الإجراءات
const ActionButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: #dc3545;
  color: white;

  &:hover {
    background-color: #c82333;
  }
`;

const ToggleButton = styled(ActionButton)`
  background-color: ${({ isActive }) => (isActive ? "#ffc107" : "#28a745")};
  color: ${({ isActive }) => (isActive ? "#212529" : "white")};

  &:hover {
    background-color: ${({ isActive }) => (isActive ? "#e0a800" : "#218838")};
  }
`;

const UserInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const UserInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfoLabel = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const UserInfoValue = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const NoUsersMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.lighter};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  margin: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const UsersCount = styled.div`
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

// Modal للتأكيد
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
  text-align: center;
`;

const ModalTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const ModalMessage = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.5;
`;

const ModalActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
`;

const ConfirmButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;
`;

const ConfirmDeleteButton = styled(ConfirmButton)`
  background-color: #dc3545;
  color: white;

  &:hover {
    background-color: #c82333;
  }
`;

const ConfirmToggleButton = styled(ConfirmButton)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

const CancelButton = styled(ConfirmButton)`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: white;
  }
`;

// Custom Dropdown Component
const CustomDropdown = ({ options, value, onChange, placeholder }) => {
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
      <DropdownButton type="button" onClick={handleToggle}>
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

// Modal Component للتأكيد
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  isDelete = false,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>{title}</ModalTitle>
        <ModalMessage>{message}</ModalMessage>
        <ModalActions>
          {isDelete ? (
            <ConfirmDeleteButton
              onClick={onConfirm}
              disabled={isLoading.delete}
            >
              {isLoading.delete ? <Spinner /> : confirmText}
            </ConfirmDeleteButton>
          ) : (
            <ConfirmToggleButton
              onClick={onConfirm}
              disabled={isLoading.delete}
            >
              {isLoading.update ? <Spinner /> : confirmText}
            </ConfirmToggleButton>
          )}
          <CancelButton onClick={onClose}>إلغاء</CancelButton>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

const AllUsersSection = () => {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, // 'delete' or 'toggle'
    userId: null,
    userName: null,
    isActive: null,
  });

  const { cookies, userLogin } = useLoginContext();

  const { updateUserActiveFunc, isLoading: isLoadingActive } =
    useUpdateActiveUser(closeModal);

  const { deleteUserFunc, isLoading: isLoadinDelete } =
    useDeleteUser(closeModal);

  const { isLoading, users, error } = useUsers(cookies, userLogin);
  const {
    isLoading: isLoadingBranchs,
    branchs,
    error: errBranchs,
  } = useBranchs(cookies, userLogin);

  if (errBranchs) toast.message(errBranchs.message);
  if (error) toast.message(error.message);

  const [filteredUsers, setFilteredUsers] = useState([]);

  const branches = branchs
    ? branchs.map((obj) => {
        return { value: `${obj.name}`, label: `${obj.name}` };
      })
    : [
        {
          value: `${userLogin.user?.branch?.name || "كل الفروع"}`,
          label: `${userLogin.user?.branch?.name || "كل الفروع"}`,
        },
      ];
  branches.unshift({ value: "", label: "جميع الفروع" });

  const roles = {
    manager: "مدير",
    admin: "مدير عام",
    user: "موظف",
    supervisor: "مشرف",
    accountant: "محاسب",
    "manager-products": "مدير المنتجات",
    "user-received": "موظف مستلم",
  };

  useEffect(() => {
    if (!selectedBranch) {
      setFilteredUsers(users?.data?.data || []);
    } else {
      const filtered =
        users?.data?.data?.filter((user) => {
          return user.branch.name === selectedBranch;
        }) || [];
      setFilteredUsers(filtered);
    }
  }, [selectedBranch, users?.data?.data]);

  const getRoleLabel = (roleValue) => {
    return roles[roleValue] || roleValue;
  };

  // فتح modal الحذف
  const handleDeleteClick = (userId, userName) => {
    setModalState({
      isOpen: true,
      type: "delete",
      userId,
      userName,
      isActive: null,
    });
  };

  // فتح modal التعطيل/التنشيط
  const handleToggleClick = (userId, userName, isActive, branchId) => {
    setModalState({
      isOpen: true,
      type: "toggle",
      userId,
      userName,
      isActive,
      branchId,
    });
  };

  // إغلاق Modal
  function closeModal() {
    setModalState({
      isOpen: false,
      type: null,
      userId: null,
      userName: null,
      isActive: null,
    });
  }

  // تأكيد الحذف
  const confirmDelete = () => {
    deleteUserFunc({ cookies, userLogin, userId: modalState.userId });

    // closeModal();
  };

  // تأكيد التعطيل/التنشيط
  const confirmToggle = () => {
    updateUserActiveFunc({
      cookies,
      userLogin,
      bodyObj: { userId: modalState.userId, branchId: modalState.branchId },
    });

    // closeModal();
  };

  return (
    <Container>
      <SectionHeader>
        <FilterContainer>
          <FilterLabel>فلترة حسب الفرع:</FilterLabel>
          <CustomDropdown
            options={branches}
            value={selectedBranch}
            onChange={setSelectedBranch}
            placeholder="اختر الفرع"
          />
        </FilterContainer>
      </SectionHeader>

      <UsersCount>إجمالي المستخدمين: {filteredUsers?.length}</UsersCount>

      {isLoading ? (
        <Spinner size="xlarge" />
      ) : (
        <UsersListContainer>
          {filteredUsers?.length > 0 ? (
            filteredUsers?.map((user) => (
              <UserCard key={`${user._id}`}>
                <UserHeader>
                  <UserName>{user?.name}</UserName>
                  <RoleAndActionsContainer>
                    <UserRole>{getRoleLabel(user?.role)}</UserRole>

                    {["owner", "manager", "admin"].includes(
                      userLogin.user.role
                    ) && (
                      <>
                        <ToggleButton
                          isActive={user?.active}
                          onClick={() =>
                            handleToggleClick(
                              user._id,
                              user.name,
                              user.active,
                              user.branch?._id
                            )
                          }
                        >
                          {user?.active ? "تعطيل" : "تنشيط"}
                        </ToggleButton>

                        {["owner", "admin"].includes(userLogin.user?.role) && (
                          <DeleteButton
                            onClick={() =>
                              handleDeleteClick(user._id, user.name)
                            }
                          >
                            حذف
                          </DeleteButton>
                        )}
                      </>
                    )}
                  </RoleAndActionsContainer>
                </UserHeader>

                <UserInfoGrid>
                  <UserInfoRow>
                    <UserInfoLabel>الإيميل:</UserInfoLabel>
                    <UserInfoValue>{user?.email}</UserInfoValue>
                  </UserInfoRow>

                  <UserInfoRow>
                    <UserInfoLabel>الفرع:</UserInfoLabel>
                    <UserInfoValue>
                      {user?.branch?.name || "كل الفروع"}
                    </UserInfoValue>
                  </UserInfoRow>

                  <UserInfoRow>
                    <UserInfoLabel>رقم الهاتف:</UserInfoLabel>
                    <UserInfoValue>{user?.phoneNumber}</UserInfoValue>
                  </UserInfoRow>

                  <UserInfoRow>
                    <UserInfoLabel>تاريخ الانضمام:</UserInfoLabel>
                    <UserInfoValue>
                      {user?.createdAt.split("T")[0]}
                    </UserInfoValue>
                  </UserInfoRow>

                  <UserInfoRow>
                    <UserInfoLabel>الحالة:</UserInfoLabel>
                    <UserInfoValue>
                      {user?.active ? "نشط" : "معطل"}
                    </UserInfoValue>
                  </UserInfoRow>
                </UserInfoGrid>
              </UserCard>
            ))
          ) : (
            <NoUsersMessage>لا توجد مستخدمين في الفرع المحدد</NoUsersMessage>
          )}
        </UsersListContainer>
      )}

      {/* Modal للتأكيد */}
      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={modalState.type === "delete" ? confirmDelete : confirmToggle}
        title={
          modalState.type === "delete"
            ? "تأكيد الحذف"
            : modalState.isActive
            ? "تأكيد التعطيل"
            : "تأكيد التنشيط"
        }
        message={
          modalState.type === "delete"
            ? `هل أنت متأكد من حذف المستخدم "${modalState.userName}"؟ هذا الإجراء لا يمكن التراجع عنه.`
            : modalState.isActive
            ? `هل أنت متأكد من تعطيل المستخدم "${modalState.userName}"؟`
            : `هل أنت متأكد من تنشيط المستخدم "${modalState.userName}"؟`
        }
        confirmText={
          modalState.type === "delete"
            ? "حذف"
            : modalState.isActive
            ? "تعطيل"
            : "تنشيط"
        }
        isDelete={modalState.type === "delete"}
        isLoading={{ delete: isLoadinDelete, update: isLoadingActive }}
      />
    </Container>
  );
};

export default AllUsersSection;
