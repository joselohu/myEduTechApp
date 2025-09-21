"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  parentSchema,
  ParentSchema,
} from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import {
  createParent,
  updateParent,
} from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ParentForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ParentSchema>({
    resolver: zodResolver(parentSchema),
  });

  const [state, formAction] = useFormState(
    type === "create" ? createParent : updateParent,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Parent ${type === "create" ? "created" : "updated"} successfully!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Crear un nuevo padre" : "Actualizar el padre"}
      </h1>

      <span className="text-xs text-gray-400 font-medium">
        Información de Autenticación
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nombre de Usuario"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Correo Electrónico"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
          type="email"
        />
        <InputField
          label="Contraseña"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>

      <span className="text-xs text-gray-400 font-medium">
        Información Personal
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nombre"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Apellido"
          name="surname"
          defaultValue={data?.surname}
          register={register}
          error={errors?.surname}
        />
        <InputField
          label="Teléfono"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors?.phone}
        />
        <InputField
          label="Dirección"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors?.address}
        />

        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
      </div>

      {state.error && (
        <span className="text-red-500">¡Algo salió mal!</span>
      )}
      
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Crear" : "Actualizar"}
      </button>
    </form>
  );
};

export default ParentForm;