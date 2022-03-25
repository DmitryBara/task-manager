import { Module } from '@nestjs/common';
import { PhaseRepository } from './phase.repository';
import { PhaseResolver } from './phase.resolver';
import { PhaseService } from './phase.service';

@Module({
  imports: [],
  providers: [PhaseResolver, PhaseService, PhaseRepository],
  exports: [PhaseRepository],
})
export class PhaseModule { }
