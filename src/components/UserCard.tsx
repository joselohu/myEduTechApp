import prisma from "@/lib/prisma";
import Image from "next/image";

const UserCard = async ({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent";
}) => {
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };

  const data = await modelMap[type].count();

  const typeLabels = {
    admin: "Administradores",
    teacher: "Profesores", 
    student: "Estudiantes",
    parent: "Padres"
  };

  return (
    <div className="rounded-2xl odd:bg-lightGreen even:bg-lightYellow text-white p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">

        
      </div>
      <h1 className="text-2xl text-white font-semibold my-4 text-center">{data}</h1>
      <h2 className="text-sm text-white font-medium text-gray-500 text-center">{typeLabels[type]}</h2>
    </div>
  );
};

export default UserCard;
