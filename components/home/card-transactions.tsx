import { Avatar, Card, CardBody, Button, Modal, ModalContent, ModalHeader, ModalBody, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { fetchAdmins } from "@/app/services/getAdmins";
import { Spinner } from "@nextui-org/react";
import { Admin } from "@/app/types/adminTypes";
import { getAdminsAvatars } from "@/components/hooks/adminsAwatars";
import formatDate from "../hooks/formatDate";
import axios from '@/app/axiosInstance';

const roles = ["SUPERADMIN", "ADMIN", "MODERATOR"];

export const CardTransactions = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: roles[1], // Default to 'ADMIN'
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadAdmins = async () => {
      try {
        const data = await fetchAdmins();
        setAdmins(data.data);
      } catch (error) {
        console.error("Failed to load admins:", error);
      }
    };
    loadAdmins();
  }, []);

  const validateForm = () => {
    const newErrors = { username: '', email: '', password: '', confirmPassword: '' };
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSuccessMessage(null);

    try {
      await axios.post('/admin/create', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      // After successful creation, show success message and close form
      setSuccessMessage('Admin created successfully!');
      setShowForm(false);

      // Refresh the list of admins
      const updatedAdmins = await fetchAdmins();
      setAdmins(updatedAdmins.data);

      setFormData({ username: '', email: '', password: '', confirmPassword: '', role: 'ADMIN' });
      setErrors({ username: '', email: '', password: '', confirmPassword: '' });

      // Hide the success message after 10 seconds
      setTimeout(() => setSuccessMessage(null), 10000);
    } catch (error) {
      console.error("Failed to create admin:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Card className="bg-default-50 rounded-xl shadow-md px-3">
      <CardBody className="py-5 gap-4">
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl mb-3">
            <span className="text-default-900 text-xl font-semibold">
              {"⭐"} Admins List
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {admins ?
            admins.map((admin: Admin) => (
              <div key={admin.username} className="grid grid-cols-5 w-full mb-1">
                <div className="col-span-1 py-1">
                  <Avatar
                    isBordered={admin.isActive}
                    color="success"
                    src={getAdminsAvatars(admin.role)}
                  />
                </div>

                <span className="flex flex-col text-default-900 w-full font-semibold col-start-2 col-end-4">
                  <span className="text-lg">{admin.username}</span>
                  <span className="text-xs text-yellow-500">{admin.role}</span>
                </span>

                <div className="col-start-4 col-end-6">
                  <span className="text-default-500 text-xs">{formatDate(admin.lastLogin && admin.lastLogin.toLocaleString())}</span>
                </div>
              </div>
            )) : (
              <div className="flex py-10 align-center justify-center user-select-none">
                <Spinner className="user-select-none" size="lg" color="success" />
              </div>
            )}

          <div className="flex justify-center">
            <Button onPress={() => setShowForm(true)} color="primary" className="px-6 hover:bg-primary-300">Add Admin</Button>
          </div>
        </div>
        {successMessage && (
          <div className="mt-2 p-2 bg-green-100 text-green-800 border border-green-200 rounded-lg">
            {successMessage}
          </div>
        )}

        {showForm && (
          <Modal
            backdrop={"opaque"}
            isOpen={showForm}
            onOpenChange={setShowForm}
            radius="lg"
            size="2xl"
          >
            <ModalContent>
              <ModalHeader
                className="flex flex-col gap-1 border-b border-default-400 dark:border-default-400/10">
                Create Admin Form
              </ModalHeader>
              <ModalBody className="pt-4">
                <form onSubmit={handleCreateAdmin} className="flex flex-col gap-4">
                  <Input
                    label="Username"
                    variant="bordered"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    isInvalid={!!errors.username}
                    errorMessage={errors.username}
                    required
                  />

                  <Input
                    label="Email"
                    variant="bordered"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email}
                    required
                  />

                  <Input
                    label="Password"
                    variant="bordered"
                    placeholder="Enter password"
                    type={isVisible ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password}
                    required
                    endContent={
                      <button type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                        {isVisible ? "Hide" : "Show"}
                      </button>
                    }
                  />
                  <Input
                    label="Confirm Password"
                    variant="bordered"
                    placeholder="Confirm password"
                    type={isVisible ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    isInvalid={!!errors.confirmPassword}
                    errorMessage={errors.confirmPassword}
                    required
                    endContent={
                      <button type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                        {isVisible ? "Hide" : "Show"}
                      </button>
                    }
                  />

                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="bordered">
                        {formData.role}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Select role" items={roles.map((role) => ({ role }))}>
                      {(item: any) => (
                        <DropdownItem
                          key={item.role}
                          onClick={() => setFormData({ ...formData, role: item.role })}
                        >
                          {item.role}
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>

                  <Button type="submit" disabled={isSubmitting} color="success" className="w-full">
                    {isSubmitting ? "Creating..." : "Create Admin"}
                  </Button>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </CardBody>
    </Card>
  );
};
