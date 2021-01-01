using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {

        public class Command : IRequest
        {
            public Guid Id { get; set; }

        }
            public class Handle : IRequestHandler<Command>
            {
                private readonly DataContext _context;
                public Handle(DataContext context)
                {
                    _context = context;
                }

            async Task<Unit> IRequestHandler<Command, Unit>.Handle(Command request, CancellationToken cancellationToken)
            {

                var activity = await _context.Activities.FindAsync(request.Id);

                if(activity==null)
                {
                    throw new Exception("Could not find the activity");
                }

                _context.Remove(activity);

                var sucess = await _context.SaveChangesAsync() > 0;

                if (sucess) return Unit.Value;

                throw new Exception("Problem in saving changes");
            }


        }

    }
}