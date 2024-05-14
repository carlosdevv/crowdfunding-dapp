import { useAppContext } from "@/context/app-context";
import { checkIfImage } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toEther } from "thirdweb";
import { z } from "zod";

export const formSchema = z.object({
  name: z.string(),
  title: z.string(),
  description: z.string(),
  target: z.string(),
  deadline: z.string(),
  image: z.string(),
});

export const useCreateCampaign = () => {
  const router = useRouter();
  const { createCampaign, isLoadingTransaction: isLoading } = useAppContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      title: "",
      description: "",
      target: "",
      deadline: "",
      image: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const removeZeroOfEth = 1000000000000000000n;
    checkIfImage(values.image, async (exists) => {
      if (exists) {
        createCampaign({
          ...values,
          target: toEther(BigInt(values.target) * removeZeroOfEth),
        });
        router.push("/");
      } else {
        alert("Provide valid image URL");
      }
    });
  };
  return { onSubmit, form, isLoading, router };
};
