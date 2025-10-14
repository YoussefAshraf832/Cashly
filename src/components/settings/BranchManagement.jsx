import { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useCreateBranch } from "../../hooks/branch/useCreateBranch";
import { useLoginContext } from "../../context/LoginContext";
import { useBranchs } from "../../hooks/branch/useGetAllBranch";
import toast from "react-hot-toast";
import { useUpdateBranch } from "../../hooks/branch/useUpdateBranch";
import { useDeleteBranch } from "../../hooks/branch/useDeleteBranch";
import LoadingSpinner from "../../utils/LoadingSpinner";
import Spinner from "../../utils/Spinner";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const SectionContainer = styled.div`
  height: 65vh;
  overflow-y: auto;

  /* إخفاء الـ scrollbar بدون إزالة الوظيفة */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */

  &::-webkit-scrollbar {
    display: none; /* WebKit */
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Tab = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : "transparent"};
  color: ${({ active, theme }) => (active ? "white" : theme.colors.text)};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm}
    ${({ theme }) => theme.borderRadius.sm} 0 0;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 600;
  transition: all 0.3s ease;
  border-bottom: 2px solid
    ${({ active, theme }) => (active ? theme.colors.primary : "transparent")};

  &:hover {
    background-color: ${({ active, theme }) =>
      active ? theme.colors.surface : theme.colors.lighter};
  }
`;

const TabContent = styled.div`
  display: ${({ active }) => (active ? "block" : "none")};
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

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ variant, theme }) => {
    switch (variant) {
      case "danger":
        return "#e74c3c";
      case "warning":
        return "#f39c12";
      default:
        return theme.colors.primary;
    }
  }};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: flex-start;

  &:hover {
    background-color: ${({ variant, theme }) => {
      switch (variant) {
        case "danger":
          return "#c0392b";
        case "warning":
          return "#e67e22";
        default:
          return theme.colors.surface;
      }
    }};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.muted};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
  border: 1px solid #c3e6cb;
`;

const BranchesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const BranchCard = styled.div`
  background-color: ${({ theme }) => theme.colors.lighter};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const BranchHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const BranchName = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin: 0;
`;

const BranchActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ActionButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ variant, theme }) => {
    switch (variant) {
      case "edit":
        return theme.colors.accent;
      case "delete":
        return "#e74c3c";
      default:
        return theme.colors.primary;
    }
  }};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ variant, theme }) => {
      switch (variant) {
        case "edit":
          return theme.colors.muted;
        case "delete":
          return "#c0392b";
        default:
          return theme.colors.surface;
      }
    }};
  }
`;

const BranchInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const BranchInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const BranchInfoLabel = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const BranchInfoValue = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const EditForm = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const EditActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const SearchContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ConfirmDialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ConfirmContent = styled.div`
  background-color: white;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow: ${({ theme }) => theme.shadows.strong};
  max-width: 400px;
  width: 90%;
`;

const ConfirmTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const ConfirmMessage = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const ConfirmActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
`;

const BranchManagement = () => {
  const [activeTab, setActiveTab] = useState("add");
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    formState: { errors: errorsAdd },
    reset: resetAdd,
  } = useForm();
  const { register: registerSearch, watch } = useForm();
  const [editingBranch, setEditingBranch] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const { createNewBranchFunc, isLoading: isLoadingCreate } =
    useCreateBranch(resetAdd);
  const { cookies, userLogin } = useLoginContext();
  const {
    isLoading: isLoadingBranchs,
    branchs,
    error,
  } = useBranchs(cookies, userLogin);
  const { updateBranchFunc, isLoading: isLoadingUpdate } =
    useUpdateBranch(setEditingBranch);
  const { deleteBranchFunc, isLoading: isLoadingDelete } =
    useDeleteBranch(setConfirmDelete);

  const [editName, setEditName] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editCode, setEditCode] = useState("");
  // const [showSuccess, setShowSuccess] = useState(false);
  // const [successMessage, setSuccessMessage] = useState("");
  // const [searchTerm, setSearchTerm] = useState("");

  if (isLoadingBranchs) return <LoadingSpinner />;
  if (error) toast.error(error.message);

  const searchValue = watch("search", "");

  // فلترة الفروع حسب البحث
  const filteredBranches = branchs?.filter(
    (branch) =>
      branch.name?.toLowerCase().includes(searchValue?.toLowerCase() || "") ||
      // branch.address
      //   ?.toLowerCase()
      //   .includes(searchValue?.toLowerCase() || "") ||
      branch.code?.toLowerCase().includes(searchValue?.toLowerCase() || "")
  );

  // إضافة فرع جديد
  const onAddBranch = (data) => {
    const newBranch = {
      id: Date.now(),
      name: data.name,
      address: data.address,
      phoneNumber: data.phoneNumber,
      code: data.code,
      cookies,
    };

    if (userLogin?.user.role === "owner" || userLogin?.user.role === "admin") {
      createNewBranchFunc(newBranch);
    }
  };

  // بدء تعديل الفرع
  const startEdit = (branch) => {
    setEditingBranch(branch.id);
    setEditName(branch.name);
    setEditAddress(branch.address);
    setEditPhone(branch.phoneNumber);
    setEditCode(branch.code);
  };

  // إلغاء التعديل
  const cancelEdit = () => {
    setEditingBranch(null);
    setEditName("");
    setEditAddress("");
    setEditPhone("");
    setEditCode("");
  };

  // حفظ التعديل
  const saveEdit = (branchId) => {
    if (
      !editName.trim() ||
      !editAddress.trim() ||
      !editPhone ||
      !editCode.trim()
    ) {
      toast.error("يرجى إدخال اسم و عنوان و كود و هاتف الفرع");
      return;
    }

    if (userLogin?.user.role === "owner" || userLogin?.user.role === "admin") {
      updateBranchFunc({
        branchId,
        cookies,
        bodyObj: {
          name: editName.trim(),
          address: editAddress.trim(),
          code: editCode.trim(),
          phoneNumber: editPhone,
        },
      });
    }

    // setEditingBranch(null);
  };

  return (
    <Container>
      <TabsContainer>
        <Tab active={activeTab === "add"} onClick={() => setActiveTab("add")}>
          إضافة فرع جديد
        </Tab>
        <Tab
          active={activeTab === "manage"}
          onClick={() => setActiveTab("manage")}
        >
          إدارة الفروع
        </Tab>
      </TabsContainer>

      <SectionContainer>
        {/* تبويب إضافة فرع جديد */}
        <TabContent active={activeTab === "add"}>
          <Form onSubmit={handleSubmitAdd(onAddBranch)}>
            <FormGroup>
              <Label htmlFor="name">اسم الفرع</Label>
              <Input
                id="name"
                type="text"
                placeholder="أدخل اسم الفرع"
                {...registerAdd("name", {
                  required: "اسم الفرع مطلوب",
                  minLength: {
                    value: 2,
                    message: "اسم الفرع يجب أن يكون أكثر من حرفين",
                  },
                })}
                error={errorsAdd.name}
              />
              {errorsAdd.name && (
                <ErrorMessage>{errorsAdd.name.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="address">العنوان</Label>
              <Input
                id="address"
                type="text"
                placeholder="أدخل عنوان الفرع"
                {...registerAdd("address", {
                  required: "العنوان مطلوب",
                })}
                error={errorsAdd.address}
              />
              {errorsAdd.address && (
                <ErrorMessage>{errorsAdd.address.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phoneNumber">رقم الهاتف</Label>
              <Input
                id="phoneNumber"
                type="text"
                placeholder="أدخل رقم هاتف الفرع"
                {...registerAdd("phoneNumber", {
                  required: "رقم الهاتف مطلوب",
                  pattern: {
                    value: /^[0-9+\-\s()]+$/,
                    message: "رقم الهاتف غير صحيح",
                  },
                })}
                error={errorsAdd.phoneNumber}
              />
              {errorsAdd.phoneNumber && (
                <ErrorMessage>{errorsAdd.phoneNumber.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="code">كود الفرع</Label>
              <Input
                id="code"
                type="text"
                placeholder="أدخل كود الفرع"
                {...registerAdd("code", {
                  required: "كود الفرع مطلوب",
                })}
                error={errorsAdd.code}
              />
              {errorsAdd.code && (
                <ErrorMessage>{errorsAdd.code.message}</ErrorMessage>
              )}
            </FormGroup>

            <Button type="submit" disabled={isLoadingCreate}>
              {!isLoadingCreate ? "إضافة الفرع" : <Spinner />}
            </Button>
          </Form>
        </TabContent>

        {/* تبويب إدارة الفروع */}
        <TabContent active={activeTab === "manage"}>
          <SearchContainer>
            <FormGroup>
              <Label htmlFor="search">البحث في الفروع</Label>
              <Input
                id="search"
                type="text"
                placeholder="ابحث باسم أو كود الفرع..."
                {...registerSearch("search")}
              />
            </FormGroup>
          </SearchContainer>

          <BranchesGrid>
            {filteredBranches?.map((branch) => (
              <BranchCard key={branch.id}>
                <BranchHeader>
                  <BranchName>{branch.name}</BranchName>
                  <BranchActions>
                    <ActionButton
                      variant="edit"
                      onClick={() => startEdit(branch)}
                      disabled={editingBranch === branch.id}
                    >
                      تعديل
                    </ActionButton>
                    <ActionButton
                      variant="delete"
                      onClick={() => setConfirmDelete(branch)}
                    >
                      حذف
                    </ActionButton>
                  </BranchActions>
                </BranchHeader>

                {editingBranch === branch.id ? (
                  <EditForm>
                    <FormGroup>
                      <Label>اسم الفرع</Label>
                      <Input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="اسم الفرع"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>العنوان</Label>
                      <Input
                        type="text"
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        placeholder="العنوان"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>رقم الهاتف</Label>
                      <Input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        placeholder="رقم الهاتف"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>كود الفرع</Label>
                      <Input
                        type="text"
                        value={editCode}
                        onChange={(e) => setEditCode(e.target.value)}
                        placeholder="كود الفرع"
                      />
                    </FormGroup>
                    <EditActions>
                      <Button
                        onClick={() => saveEdit(branch.id)}
                        disabled={isLoadingUpdate}
                      >
                        {isLoadingUpdate ? <Spinner /> : "حفظ"}
                      </Button>
                      <Button variant="warning" onClick={cancelEdit}>
                        إلغاء
                      </Button>
                    </EditActions>
                  </EditForm>
                ) : (
                  <BranchInfo>
                    <BranchInfoRow>
                      <BranchInfoLabel>العنوان:</BranchInfoLabel>
                      <BranchInfoValue>{branch.address}</BranchInfoValue>
                    </BranchInfoRow>
                    <BranchInfoRow>
                      <BranchInfoLabel>الهاتف:</BranchInfoLabel>
                      <BranchInfoValue>{branch.phoneNumber}</BranchInfoValue>
                    </BranchInfoRow>
                    <BranchInfoRow>
                      <BranchInfoLabel>كود الفرع:</BranchInfoLabel>
                      <BranchInfoValue>{branch.code}</BranchInfoValue>
                    </BranchInfoRow>
                    <BranchInfoRow>
                      <BranchInfoLabel>تاريخ الإنشاء:</BranchInfoLabel>
                      <BranchInfoValue>
                        {branch.createdAt.split("T")[0]}
                      </BranchInfoValue>
                    </BranchInfoRow>
                  </BranchInfo>
                )}
              </BranchCard>
            ))}
          </BranchesGrid>

          {filteredBranches?.length === 0 && (
            <SuccessMessage
              style={{
                backgroundColor: "#fff3cd",
                color: "#856404",
                borderColor: "#ffeaa7",
              }}
            >
              لا توجد فروع تطابق البحث
            </SuccessMessage>
          )}
        </TabContent>
      </SectionContainer>

      {/* نافذة تأكيد الحذف */}
      {confirmDelete && (
        <ConfirmDialog>
          <ConfirmContent>
            <ConfirmTitle>تأكيد الحذف</ConfirmTitle>
            <ConfirmMessage>
              هل أنت متأكد من حذف فرع "{confirmDelete.name}"؟
              <br />
              لا يمكن التراجع عن هذا الإجراء.
            </ConfirmMessage>
            <ConfirmActions>
              <Button
                variant="danger"
                onClick={() => {
                  deleteBranchFunc({ branchId: confirmDelete.id, cookies });
                }}
                disabled={isLoadingDelete}
              >
                {isLoadingDelete ? <Spinner /> : "حذف"}
              </Button>
              <Button variant="warning" onClick={() => setConfirmDelete(null)}>
                إلغاء
              </Button>
            </ConfirmActions>
          </ConfirmContent>
        </ConfirmDialog>
      )}
    </Container>
  );
};

export default BranchManagement;
