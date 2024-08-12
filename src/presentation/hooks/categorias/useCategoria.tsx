import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Category } from "../../../domain/entities/category";
import {
  createCategory,
  getcategoryById,
  updateCategory,
} from "../../../actions/categories.actions";

interface Props {
  categoryId: string;
  navigation: any;
}
export const useCategoria = ({ categoryId, navigation }: Props) => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery<Category | null>({
    queryKey: ["categoria", categoryId],
    queryFn: () => getcategoryById(categoryId),
    enabled: !!categoryId,
  });

  const mutation = useMutation({
    mutationFn: (data: Category) => {
      return data.id ? updateCategory(data.id, data) : createCategory(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
      navigation.goBack();
    },
    onError: (error) => {
      console.error("Error saving category:", error);
    },
  });

  return {
    data,
    isLoading,
    error,
    mutation,
  };
};
