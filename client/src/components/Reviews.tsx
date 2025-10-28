import { Star, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  image: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Maria Silva",
    rating: 5,
    comment: "Melhor açaí da região! Cremoso, saboroso e com bastante complemento. Sempre peço e nunca decepciona. Super recomendo!",
    image: "/acai_bowl_purple_smo_b415b1c9.jpg",
    date: "Há 2 dias"
  },
  {
    id: 2,
    name: "João Pedro",
    rating: 5,
    comment: "Açaí de qualidade premium! Chegou rapidinho e bem gelado. Os complementos são fresquinhos. Virei cliente fiel! 🍇",
    image: "/acai_bowl_purple_smo_30078b6f.jpg",
    date: "Há 3 dias"
  },
  {
    id: 3,
    name: "Ana Carolina",
    rating: 4,
    comment: "Muito bom! Só achei que poderia vir um pouquinho mais cheio, mas o sabor é excelente e a entrega foi rápida.",
    image: "/acai_bowl_purple_smo_744a4e61.jpg",
    date: "Há 5 dias"
  },
  {
    id: 4,
    name: "Carlos Eduardo",
    rating: 5,
    comment: "Simplesmente perfeito! Cremoso na medida certa, não aguado. Banana fresquinha e granola crocante. Melhor impossível!",
    image: "/acai_bowl_purple_smo_1624d014.jpg",
    date: "Há 1 semana"
  },
  {
    id: 5,
    name: "Juliana Costa",
    rating: 5,
    comment: "Açaí maravilhoso! Peço toda semana. A qualidade é sempre a mesma, nunca vem aguado. Parabéns pelo capricho! 👏",
    image: "/acai_bowl_purple_smo_de62c0bf.jpg",
    date: "Há 1 semana"
  },
  {
    id: 6,
    name: "Roberto Santos",
    rating: 4,
    comment: "Muito bom mesmo! Sabor autêntico e bem gelado. Só demorou um pouco mais que o previsto na entrega, mas valeu a pena esperar.",
    image: "/acai_bowl_purple_smo_fffbbd86.jpg",
    date: "Há 2 semanas"
  }
];

export function Reviews() {
  const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);
  const totalReviews = reviews.length;

  return (
    <section className="w-full py-12 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header da seção */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-purple-900 mb-3">
            O que nossos clientes dizem
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 ${
                    star <= Math.round(parseFloat(averageRating))
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-800">{averageRating}</span>
          </div>
          <p className="text-gray-600">Baseado em {totalReviews} avaliações</p>
        </div>

        {/* Grid de avaliações */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="overflow-hidden hover:shadow-xl transition-shadow border-2 border-purple-100">
              <CardContent className="p-0">
                {/* Imagem do açaí */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={review.image}
                    alt={`Açaí avaliado por ${review.name}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Conteúdo da avaliação */}
                <div className="p-4">
                  {/* Nome e data */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <User className="h-4 w-4 text-purple-700" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{review.name}</p>
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </div>
                    </div>
                  </div>

                  {/* Estrelas */}
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comentário */}
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
