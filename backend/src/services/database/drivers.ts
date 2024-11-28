import { Decimal } from "@prisma/client/runtime/library";

interface Drivers {
    name: string;
    description: string;  
    vehicle: string; 
    rating: number;
    comment: string;
    tax: Decimal;
    min_km: number;
}

export const drivers = [
    {
      name: "Carla",
      description: "Sempre pronta para ajudar e oferecer uma viagem confortável.",
      vehicle: "Hyundai HB20 Branco",
      rating: 4,
      comment: "Motorista simpática e atenciosa.",
      tax: new Decimal(6.00),
      min_km: 2
    },
    {
      name: "João",
      description: "Prezo pela pontualidade e um carro sempre limpo.",
      vehicle: "Renault Logan Cinza",
      rating: 4,
      comment: "Pontual e educado, carro em ótimo estado.",
      tax: new Decimal(5.80),
      min_km: 1
    },
    {
      name: "Beatriz",
      description: "Gosto de boas conversas e música tranquila durante a viagem.",
      vehicle: "Fiat Argo Vermelho",
      rating: 4,
      comment: "Viagem agradável, ótima conversa.",
      tax: new Decimal(5.90),
      min_km: 1
    },
    {
      name: "Ricardo",
      description: "Motorista experiente, conheço os melhores atalhos na cidade.",
      vehicle: "Toyota Corolla Prata",
      rating: 5,
      comment: "Muito eficiente, chegou rápido ao destino.",
      tax: new Decimal(6.50),
      min_km: 2
    },
    {
      name: "Fernanda",
      description: "Faço viagens seguras, sempre respeitando o tempo do passageiro.",
      vehicle: "Volkswagen Voyage Azul",
      rating: 4,
      comment: "Educada e profissional.",
      tax: new Decimal(5.70),
      min_km: 1
    },
    {
      name: "Gustavo",
      description: "Prezo por conforto e direção tranquila para todos os passageiros.",
      vehicle: "Honda City Preto",
      rating: 5,
      comment: "Excelente motorista, muito cuidadoso.",
      tax: new Decimal(6.30),
      min_km: 1
    },
    {
      name: "Larissa",
      description: "Carro espaçoso e confortável, ideal para viagens em grupo.",
      vehicle: "Chevrolet Spin Branco",
      rating: 4,
      comment: "Perfeito para famílias, muito espaço no carro.",
      tax: new Decimal(6.80),
      min_km: 3
    },
    {
      name: "Eduardo",
      description: "Sempre atualizado com o trânsito e utilizando os melhores caminhos.",
      vehicle: "Volkswagen Gol Prata",
      rating: 4,
      comment: "Motorista eficiente, conhece bem a cidade.",
      tax: new Decimal(5.60),
      min_km: 1
    },
    {
      name: "Tatiane",
      description: "Trabalho com dedicação para oferecer uma experiência de viagem única.",
      vehicle: "Nissan Versa Preto",
      rating: 5,
      comment: "Excelente viagem, motorista muito educada.",
      tax: new Decimal(6.10),
      min_km: 3
    },
    {
      name: "Rafael",
      description: "Direção segura e carro sempre higienizado.",
      vehicle: "Ford Ka Azul",
      rating: 4,
      comment: "Motorista cuidadoso e educado.",
      tax: new Decimal(5.90),
      min_km: 1
    },
    {
        name: "Marcos",
        description: "Às vezes atrasos acontecem, mas faço o possível para corrigir.",
        vehicle: "Renault Kwid Vermelho",
        rating: 3,
        comment: "Motorista atrasou e o carro estava um pouco sujo.",
        tax: new Decimal(5.30),
        min_km: 1
    },
    {
        name: "Sônia",
        description: "Trabalho em várias áreas e pode haver alguma demora nos horários de pico.",
        vehicle: "Fiat Uno Cinza",
        rating: 3,
        comment: "Demorou a encontrar o endereço e a viagem foi um pouco tensa.",
        tax: new Decimal(5.00),
        min_km: 1
    },
    {
        name: "Carlos",
        description: "Meu foco é sempre melhorar, buscando mais eficiência a cada dia.",
        vehicle: "Chevrolet Cobalt Azul",
        rating: 3,
        comment: "Carro com cheiro estranho, mas a viagem foi tranquila.",
        tax: new Decimal(6.00),
        min_km: 2
    },
    {
        name: "André",
        description: "Especializado em viagens mais longas, ideal para deslocamentos tranquilos.",
        vehicle: "Jeep Compass Branco",
        rating: 5,
        comment: "Carro confortável, ideal para trajetos longos.",
        tax: new Decimal(8.50),
        min_km: 4
    },
    {
        name: "Paula",
        description: "Adoro oferecer conforto e tranquilidade em viagens maiores.",
        vehicle: "Toyota SW4 Preto",
        rating: 5,
        comment: "Viagem excelente, motorista profissional e carro impecável.",
        tax: new Decimal(9.00),
        min_km: 4
    },
    {
        name: "Leonardo",
        description: "Ideal para viagens longas, com um carro espaçoso e silencioso.",
        vehicle: "Mitsubishi Outlander Prata",
        rating: 4,
        comment: "Excelente para quem precisa de espaço e conforto em distâncias maiores.",
        tax: new Decimal(8.80),
        min_km: 4
    }
];



  


  
  